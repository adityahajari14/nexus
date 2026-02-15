import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';
import { extractShopifyProduct } from './extractShopifyProduct';

/**
 * Normalizes a product URL to ensure consistent deduplication
 */
function normalizeProductUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove query params and fragments, keep only pathname
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`.toLowerCase();
  } catch {
    // If URL parsing fails, try to extract product path
    const match = url.match(/(https?:\/\/[^\/]+)(\/products\/[^\/\?#]+)/i);
    if (match) {
      return match[0].toLowerCase().split('?')[0].split('#')[0];
    }
    return url.toLowerCase().split('?')[0].split('#')[0];
  }
}

/**
 * Extracts all product URLs from a Shopify collection/category page
 */
function extractProductUrls($: cheerio.Root, baseUrl: string, collectionUrl: string): string[] {
  const productUrls = new Set<string>();
  
  // Common Shopify and PrestaShop product link selectors
  const productSelectors = [
    'a[href*="/products/"]',
    'a[href*="/mattresses/"]',
    '.product-card a',
    '.product-item a',
    '.product-link',
    '[data-product-url]',
    '.grid-product__link',
    '.product__link',
    '.product-miniature a',
    '.js-product-miniature-wrapper a',
  ];

  productSelectors.forEach(selector => {
    $(selector).each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        // Skip products in global navigation, recommendations, or other collection sections
        const $element = $(element);
        const isInNavigation = $element.closest('nav, header, .navigation, .nav, .menu, .sidebar, .recommendations, .related-products, .you-may-also-like').length > 0;
        if (isInNavigation) {
          return;
        }

        // Handle relative URLs
        let fullUrl = href;
        if (href.startsWith('/')) {
          try {
            const urlObj = new URL(baseUrl);
            fullUrl = `${urlObj.protocol}//${urlObj.host}${href}`;
          } catch {
            fullUrl = href.startsWith('http') ? href : `https://${href}`;
          }
        } else if (!href.startsWith('http')) {
          try {
            const urlObj = new URL(baseUrl);
            fullUrl = `${urlObj.protocol}//${urlObj.host}/${href}`;
          } catch {
            fullUrl = `https://${href}`;
          }
        }

        // Support both Shopify (/products/) and PrestaShop (/mattresses/ etc.) patterns
        if (fullUrl.includes('/products/') || fullUrl.includes('/mattresses/')) {
          const normalizedUrl = normalizeProductUrl(fullUrl);
          if (normalizedUrl.includes('/products/') || normalizedUrl.includes('/mattresses/')) {
            productUrls.add(normalizedUrl);
          }
        }
      }
    });
  });

  // Also check for product URLs in JSON-LD structured data
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const content = $(element).html();
      if (content) {
        const data = JSON.parse(content);
        
        // Check for ItemList with products
        if (data['@type'] === 'ItemList' && data.itemListElement) {
          data.itemListElement.forEach((item: any) => {
            if (item.item && item.item['@id']) {
              const productUrl = item.item['@id'];
              if (productUrl && (productUrl.includes('/products/') || productUrl.includes('/mattresses/'))) {
                const normalizedUrl = normalizeProductUrl(productUrl);
                if (normalizedUrl.includes('/products/') || normalizedUrl.includes('/mattresses/')) {
                  productUrls.add(normalizedUrl);
                }
              }
            }
          });
        }
        
        // Check for @graph with products
        if (data['@graph']) {
          data['@graph'].forEach((item: any) => {
            if (item['@type'] === 'Product' && item['@id']) {
              const productUrl = item['@id'];
              if (productUrl && (productUrl.includes('/products/') || productUrl.includes('/mattresses/'))) {
                const normalizedUrl = normalizeProductUrl(productUrl);
                if (normalizedUrl.includes('/products/') || normalizedUrl.includes('/mattresses/')) {
                  productUrls.add(normalizedUrl);
                }
              }
            }
          });
        }
      }
    } catch (error) {
      // Silently continue
    }
  });

  return Array.from(productUrls);
}

/**
 * Gets the next page URL using ?page= query parameter
 */
function getNextPageUrl(baseUrl: string, currentPage: number): string {
  try {
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set('page', String(currentPage + 1));
    return urlObj.toString();
  } catch {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${currentPage + 1}`;
  }
}

/**
 * Checks if a page has pagination indicators suggesting more pages exist
 */
function hasPaginationIndicators($: cheerio.Root, currentPage: number): boolean {
  const paginationSelectors = [
    '.pagination',
    '.pagination__nav',
    '[data-pagination]',
    '.page-numbers',
    'nav[aria-label*="pagination"]',
  ];

  for (const selector of paginationSelectors) {
    const pagination = $(selector);
    if (pagination.length > 0) {
      const nextButton = pagination.find('a[rel="next"], .next, [aria-label*="next" i]');
      if (nextButton.length > 0 && nextButton.attr('href')) {
        return true;
      }
      
      const pageNumbers = pagination.find('a, button').map((_, el) => {
        const text = $(el).text().trim();
        const pageNum = parseInt(text);
        return isNaN(pageNum) ? 0 : pageNum;
      }).get();
      
      const maxPage = Math.max(...pageNumbers, 0);
      if (maxPage > currentPage) {
        return true;
      }
    }
  }

  const loadMoreSelectors = [
    'button:contains("Load More")',
    'button:contains("Show More")',
    'a:contains("Load More")',
    '[data-load-more]',
  ];

  for (const selector of loadMoreSelectors) {
    if ($(selector).length > 0) {
      return true;
    }
  }

  return false;
}

/**
 * Analyzes a collection page to determine total pages and products
 */
async function analyzeCollection(collectionUrl: string): Promise<{
  totalPages: number;
  totalProducts: number;
  productUrls: string[];
}> {
  const allProductUrls = new Set<string>();
  let currentPage = 1;
  let hasMorePages = true;
  let consecutiveEmptyPages = 0;
  const baseUrl = collectionUrl.split('?')[0];

  let currentUrl = baseUrl;
  try {
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.delete('page');
    currentUrl = urlObj.toString();
  } catch {
    currentUrl = baseUrl;
  }

  console.log(`🔍 Analyzing collection: ${collectionUrl}\n`);

  while (hasMorePages) {
    const pageUrl = currentPage === 1 ? currentUrl : getNextPageUrl(currentUrl, currentPage - 1);
    
    console.log(`   📄 Checking page ${currentPage}...`);

    try {
      const response = await axios.get(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: 30000,
        validateStatus: (status) => status < 500,
      });

      if (response.status === 404 || !response.data) {
        console.log(`   ⚠️  Page ${currentPage} returned 404, stopping pagination`);
        hasMorePages = false;
        break;
      }

      const $ = cheerio.load(response.data);
      const productUrls = extractProductUrls($, pageUrl, collectionUrl);

      if (productUrls.length > 0) {
        consecutiveEmptyPages = 0;
        productUrls.forEach(url => allProductUrls.add(url));
        console.log(`   ✓ Found ${productUrls.length} products on page ${currentPage}`);
      } else {
        consecutiveEmptyPages++;
        console.log(`   ⚠️  No products found on page ${currentPage}`);
        
        const hasPagination = hasPaginationIndicators($, currentPage);
        
        if (!hasPagination) {
          console.log(`   ⚠️  No pagination indicators found, stopping pagination`);
          hasMorePages = false;
          break;
        } else if (consecutiveEmptyPages >= 2) {
          console.log(`   ⚠️  ${consecutiveEmptyPages} consecutive empty pages, stopping pagination`);
          hasMorePages = false;
          break;
        } else {
          console.log(`   ℹ️  Pagination indicators found, continuing...`);
        }
      }

      currentPage++;

      if (currentPage > 100) {
        console.log(`   ⚠️  Reached page limit (100), stopping pagination`);
        hasMorePages = false;
        break;
      }

    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`   ⚠️  Page ${currentPage} returned 404, stopping pagination`);
        hasMorePages = false;
        break;
      }
      
      if (currentPage > 1) {
        console.log(`   ⚠️  Error on page ${currentPage} (${error.message}), trying next page...`);
        consecutiveEmptyPages++;
        if (consecutiveEmptyPages >= 2) {
          console.log(`   ⚠️  ${consecutiveEmptyPages} consecutive errors, stopping pagination`);
          hasMorePages = false;
          break;
        }
        currentPage++;
        continue;
      }
      
      throw error;
    }
  }

  const uniqueUrls = Array.from(allProductUrls);
  return {
    totalPages: currentPage - 1,
    totalProducts: uniqueUrls.length,
    productUrls: uniqueUrls,
  };
}

/**
 * Prompts user for confirmation
 */
function askForConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Extracts all products from a collection page
 */
export async function extractSloomyProducts(
  collectionUrl: string,
  options: {
    maxConcurrent?: number;
    delayBetweenRequests?: number;
    skipConfirmation?: boolean;
  } = {}
): Promise<any[]> {
  const { maxConcurrent = 3, delayBetweenRequests = 1000, skipConfirmation = false } = options;

  console.log('📊 Step 1: Analyzing collection...\n');
  const analysis = await analyzeCollection(collectionUrl);

  console.log('\n' + '='.repeat(60));
  console.log('📋 COLLECTION ANALYSIS SUMMARY');
  console.log('='.repeat(60));
  console.log(`Collection URL: ${collectionUrl}`);
  console.log(`Total Pages: ${analysis.totalPages}`);
  console.log(`Total Products: ${analysis.totalProducts}`);
  console.log('='.repeat(60) + '\n');

  if (!skipConfirmation) {
    const confirmed = await askForConfirmation('Do you want to proceed with extraction? (y/n): ');
    if (!confirmed) {
      console.log('\n❌ Extraction cancelled by user.');
      return [];
    }
    console.log('\n✅ Starting extraction...\n');
  }

  const productUrls = analysis.productUrls;

  if (productUrls.length === 0) {
    console.log('⚠️  No products found on this collection page');
    return [];
  }

  console.log(`\n📦 Extracting data from ${productUrls.length} products...`);
  console.log(`   Using ${maxConcurrent} concurrent extractions with ${delayBetweenRequests}ms delay\n`);

  const products: any[] = [];
  const errors: Array<{ url: string; error: string }> = [];

  for (let i = 0; i < productUrls.length; i += maxConcurrent) {
    const batch = productUrls.slice(i, i + maxConcurrent);
    
    const batchPromises = batch.map(async (url, index) => {
      if (i + index > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
      }

      try {
        console.log(`   [${i + index + 1}/${productUrls.length}] Extracting: ${url}`);
        const product = await extractShopifyProduct(url);
        
        const now = new Date();
        const formatDate = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        };

        const stripHtmlTags = (html: string | null | undefined): string | null => {
          if (!html) return null;
          return html
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();
        };

        const generateCuid = (): string => {
          const prefix = 'cmj';
          const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
          let random = '';
          for (let j = 0; j < 25; j++) {
            random += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return prefix + random;
        };

        const transformedProduct = {
          id: generateCuid(),
          title: product.title,
          description: stripHtmlTags(product.description) || null,
          images: product.images,
          videos: product.videos,
          createdAt: formatDate(now),
          updatedAt: formatDate(now),
        };

        console.log(`   ✓ Successfully extracted: ${product.title}`);
        return transformedProduct;
      } catch (error: any) {
        const errorMsg = error.message || 'Unknown error';
        console.error(`   ❌ Failed to extract ${url}: ${errorMsg}`);
        errors.push({ url, error: errorMsg });
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    products.push(...batchResults.filter(p => p !== null));
  }

  console.log(`\n✅ Extraction complete!`);
  console.log(`   Successfully extracted: ${products.length} products`);
  if (errors.length > 0) {
    console.log(`   Failed extractions: ${errors.length}`);
    console.log(`   Failed URLs:`);
    errors.forEach(({ url, error }) => {
      console.log(`     - ${url}: ${error}`);
    });
  }

  return products;
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: tsx extractSloomyProducts.ts <collection-url> [output-file] [options]

Examples:
  tsx extractSloomyProducts.ts https://sloomy.co.uk/mattresses
  tsx extractSloomyProducts.ts https://sloomy.co.uk/mattresses products.json
  tsx extractSloomyProducts.ts https://sloomy.co.uk/mattresses products.json --max-concurrent=5 --delay=2000

Options:
  --max-concurrent=<number>  Maximum concurrent product extractions (default: 3)
  --delay=<number>           Delay in milliseconds between requests (default: 1000)
  --skip-confirmation        Skip confirmation prompt and start extraction immediately
  --yes, -y                  Alias for --skip-confirmation
    `);
    process.exit(1);
  }

  const collectionUrl = args[0];
  const outputFile = args[1];

  const options: { maxConcurrent?: number; delayBetweenRequests?: number; skipConfirmation?: boolean } = {};
  args.forEach(arg => {
    if (arg.startsWith('--max-concurrent=')) {
      options.maxConcurrent = parseInt(arg.split('=')[1]) || 3;
    } else if (arg.startsWith('--delay=')) {
      options.delayBetweenRequests = parseInt(arg.split('=')[1]) || 1000;
    } else if (arg === '--skip-confirmation' || arg === '--yes' || arg === '-y') {
      options.skipConfirmation = true;
    }
  });

  try {
    const products = await extractSloomyProducts(collectionUrl, options);

    if (products.length === 0) {
      console.log('\n⚠️  No products were extracted');
      process.exit(1);
    }

    const output = JSON.stringify(products, null, 2);

    if (outputFile) {
      const outputPath = outputFile.startsWith('/') || outputFile.match(/^[A-Z]:/)
        ? outputFile
        : join(process.cwd(), outputFile);
      writeFileSync(outputPath, output, 'utf-8');
      console.log(`\n💾 Saved ${products.length} products to: ${outputPath}`);
    } else {
      console.log(`\n📄 Extracted ${products.length} Products:`);
      console.log(output);
    }

  } catch (error: any) {
    console.error('\n💥 Failed to extract products:', error.message);
    process.exit(1);
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  main();
} else if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].includes('extractSloomyProducts')) {
  main();
}
