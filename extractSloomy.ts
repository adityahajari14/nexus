import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Extracts full product details from a single product page
 */
async function extractProductDetails(productUrl: string): Promise<any> {
  try {
    const response = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    
    let title = '';
    let description = '';
    let images: string[] = [];
    let videos: string[] = [];
    let price: string | null = null;
    let currency = 'GBP';

    // Extract from JSON-LD structured data (most reliable for PrestaShop)
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const content = $(element).html();
        if (content) {
          const data = JSON.parse(content);
          
          if (data['@type'] === 'Product') {
            title = data.name || title;
            description = data.description || description;
            
            // Extract images
            if (data.image) {
              if (Array.isArray(data.image)) {
                images.push(...data.image);
              } else if (typeof data.image === 'string') {
                images.push(data.image);
              }
            }
            
            // Extract price
            if (data.offers) {
              const offers = Array.isArray(data.offers) ? data.offers[0] : data.offers;
              price = offers.price || offers.lowPrice || null;
              currency = offers.priceCurrency || currency;
            }
          }
        }
      } catch (error) {
        // Continue
      }
    });

    // Fallback: Extract from HTML if JSON-LD didn't work
    if (!title) {
      title = $('h1.h1, h1[itemprop="name"], .product-title').first().text().trim() || 
              $('h1').first().text().trim();
    }

    if (!description) {
      description = $('.product-description, [itemprop="description"], #description, .description-short')
        .first().text().trim();
    }

    // Extract images from meta tags (most reliable for PrestaShop)
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && !ogImage.startsWith('data:')) {
      images.push(ogImage);
    }
    
    const twitterImage = $('meta[name="twitter:image"]').attr('content');
    if (twitterImage && !twitterImage.startsWith('data:') && !images.includes(twitterImage)) {
      images.push(twitterImage);
    }

    // Extract images from HTML if not found in JSON-LD
    if (images.length === 0) {
      $('.product-images img, .js-qv-product-images img, [data-image-large-src], .product-cover img').each((_, el) => {
        const src = $(el).attr('data-image-large-src') || 
                    $(el).attr('data-src') || 
                    $(el).attr('data-lazy-src') ||
                    $(el).attr('src');
        if (src && !src.includes('placeholder') && !src.startsWith('data:')) {
          // Get high-res version if available
          const highResSrc = src.replace(/-small_default|-home_default|-medium_default|-cart_default/, '-large_default');
          if (!images.includes(highResSrc)) {
            images.push(highResSrc);
          }
        }
      });
      
      // Also check for image links in product gallery
      $('.product-images a, .js-qv-product-images a, .images a').each((_, el) => {
        const href = $(el).attr('href');
        if (href && (href.includes('.jpg') || href.includes('.jpeg') || href.includes('.png') || href.includes('.webp'))) {
          if (!images.includes(href)) {
            images.push(href);
          }
        }
      });
    }

    // Extract price from HTML if not found in JSON-LD
    if (!price) {
      const priceText = $('.product-price, .current-price-value, [itemprop="price"]').first().text().trim();
      const priceMatch = priceText.match(/[\d,]+\.?\d*/);
      if (priceMatch) {
        price = priceMatch[0].replace(/,/g, '');
      }
    }

    // Extract videos (if any)
    $('video source, iframe[src*="youtube"], iframe[src*="vimeo"]').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !videos.includes(src)) {
        videos.push(src);
      }
    });

    return {
      title: title || 'Unknown Product',
      description: description || null,
      images: [...new Set(images)], // Remove duplicates
      videos: [...new Set(videos)],
      price,
      currency,
    };
  } catch (error: any) {
    console.error(`      ❌ Failed to extract details: ${error.message}`);
    return null;
  }
}

/**
 * Extracts product URLs and full details from PrestaShop category pages
 */
async function extractSloomyMattresses(maxPages: number = 5, maxConcurrent: number = 3): Promise<any[]> {
  const products: any[] = [];
  const seenUrls = new Set<string>();
  const productUrls: string[] = [];
  const baseUrl = 'https://sloomy.co.uk/mattresses';
  
  console.log(`🔍 Step 1: Collecting product URLs (max ${maxPages} pages)...\n`);
  
  console.log(`🔍 Step 1: Collecting product URLs (max ${maxPages} pages)...\n`);
  
  // Step 1: Collect all product URLs from category pages
  for (let page = 1; page <= maxPages; page++) {
    const url = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
    console.log(`   📄 Page ${page}: ${url}`);
    
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        timeout: 30000,
      });
      
      const $ = cheerio.load(response.data);
      let pageProducts = 0;
      
      // Extract product URLs from JSON-LD
      $('script[type="application/ld+json"]').each((_, element) => {
        try {
          const content = $(element).html();
          if (content) {
            const data = JSON.parse(content);
            
            if (data['@type'] === 'ItemList' && data.itemListElement) {
              data.itemListElement.forEach((item: any) => {
                const url = item.item?.url || item.url;
                if (url) {
                  const productUrl = url.split('#')[0]; // Remove variant hash
                  if (!seenUrls.has(productUrl)) {
                    seenUrls.add(productUrl);
                    productUrls.push(productUrl);
                    pageProducts++;
                  }
                }
              });
            }
          }
        } catch (error) {
          // Continue
        }
      });
      
      console.log(`      ✓ Found ${pageProducts} products`);
      
      if (pageProducts === 0) {
        console.log(`      ⚠️ No products found, stopping pagination`);
        break;
      }
      
    } catch (error: any) {
      console.error(`      ❌ Error: ${error.message}`);
      break;
    }
  }

  console.log(`\n✅ Collected ${productUrls.length} unique product URLs`);
  console.log(`\n🔍 Step 2: Extracting full product details...\n`);

  // Step 2: Extract full details from each product page (with concurrency control)
  for (let i = 0; i < productUrls.length; i += maxConcurrent) {
    const batch = productUrls.slice(i, i + maxConcurrent);
    
    const batchPromises = batch.map(async (url, index) => {
      const productIndex = i + index + 1;
      console.log(`   [${productIndex}/${productUrls.length}] Extracting: ${url}`);
      
      // Add delay to avoid overwhelming the server
      if (productIndex > 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      const details = await extractProductDetails(url);
      
      if (details) {
        const generateCuid = (): string => {
          const prefix = 'cmj';
          const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
          let random = '';
          for (let j = 0; j < 25; j++) {
            random += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return prefix + random;
        };
        
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
        
        console.log(`      ✓ ${details.title} - ${details.images.length} images, ${details.price ? `£${details.price}` : 'No price'}`);
        
        return {
          id: generateCuid(),
          title: details.title,
          description: details.description,
          images: details.images,
          videos: details.videos,
          url: url,
          price: details.price,
          currency: details.currency,
          createdAt: formatDate(now),
          updatedAt: formatDate(now),
        };
      }
      return null;
    });

    const batchResults = await Promise.all(batchPromises);
    products.push(...batchResults.filter(p => p !== null));
  }
  
  return products;
}

async function main() {
  const maxPages = process.argv[2] ? parseInt(process.argv[2]) : 5;
  const outputFile = process.argv[3] || 'sloomy-products.json';
  const maxConcurrent = 3; // Process 3 products at a time
  
  console.log('🏢 Sloomy Mattress Products Extractor\n');
  console.log('='.repeat(60));
  
  try {
    const products = await extractSloomyMattresses(maxPages, maxConcurrent);
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Extraction complete!`);
    console.log(`   Total products: ${products.length}`);
    
    // Calculate stats
    const withImages = products.filter(p => p.images.length > 0).length;
    const withPrice = products.filter(p => p.price).length;
    const withDescription = products.filter(p => p.description).length;
    const withVideos = products.filter(p => p.videos.length > 0).length;
    
    console.log(`   Products with images: ${withImages}/${products.length}`);
    console.log(`   Products with prices: ${withPrice}/${products.length}`);
    console.log(`   Products with descriptions: ${withDescription}/${products.length}`);
    console.log(`   Products with videos: ${withVideos}/${products.length}`);
    console.log('='.repeat(60) + '\n');
    
    if (products.length === 0) {
      console.log('⚠️  No products were extracted');
      process.exit(1);
    }
    
    const output = JSON.stringify(products, null, 2);
    const outputPath = outputFile.startsWith('/') || outputFile.match(/^[A-Z]:/)
      ? outputFile
      : join(process.cwd(), outputFile);
    
    writeFileSync(outputPath, output, 'utf-8');
    console.log(`💾 Saved ${products.length} products to: ${outputPath}\n`);
    
    // Show sample
    console.log('📋 Sample Products:');
    products.slice(0, 3).forEach((p, i) => {
      console.log(`\n   ${i + 1}. ${p.title}`);
      console.log(`      URL: ${p.url}`);
      console.log(`      Images: ${p.images.length}`);
      if (p.price) console.log(`      Price: ${p.currency} ${p.price}`);
      if (p.description) console.log(`      Description: ${p.description.substring(0, 100)}...`);
    });
    
  } catch (error: any) {
    console.error('\n💥 Failed to extract products:', error.message);
    process.exit(1);
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  main();
} else if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].includes('extractSloomy')) {
  main();
}

export { extractSloomyMattresses };
