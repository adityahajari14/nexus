import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Extracts product data from a Shopify product page
 * 
 * @param productUrl - The URL of the Shopify product page
 * @returns Product data including title, description, images, and videos
 */
export async function extractShopifyProduct(productUrl: string): Promise<{
  title: string;
  description: string | null;
  images: string[];
  videos: string[];
}> {
  try {
    // Fetch the product page
    const response = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    
    // Extract product data
    let title = '';
    let description: string | null = null;
    const images: string[] = [];
    const videos: string[] = [];

    // Try to extract from JSON-LD structured data first (most reliable)
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const content = $(element).html();
        if (content) {
          const data = JSON.parse(content);
          
          // Handle single product
          if (data['@type'] === 'Product') {
            if (!title) title = data.name || '';
            if (!description) description = data.description || null;
            
            // Extract images
            if (data.image) {
              if (Array.isArray(data.image)) {
                data.image.forEach((img: any) => {
                  const imgUrl = typeof img === 'string' ? img : img?.url || img?.contentUrl;
                  if (imgUrl && !images.includes(imgUrl)) {
                    images.push(imgUrl);
                  }
                });
              } else {
                const imgUrl = typeof data.image === 'string' ? data.image : data.image?.url || data.image?.contentUrl;
                if (imgUrl && !images.includes(imgUrl)) {
                  images.push(imgUrl);
                }
              }
            }
          }
          
          // Handle @graph with products
          if (data['@graph']) {
            data['@graph'].forEach((item: any) => {
              if (item['@type'] === 'Product') {
                if (!title) title = item.name || '';
                if (!description) description = item.description || null;
                
                // Extract images
                if (item.image) {
                  if (Array.isArray(item.image)) {
                    item.image.forEach((img: any) => {
                      const imgUrl = typeof img === 'string' ? img : img?.url || img?.contentUrl;
                      if (imgUrl && !images.includes(imgUrl)) {
                        images.push(imgUrl);
                      }
                    });
                  } else {
                    const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url || item.image?.contentUrl;
                    if (imgUrl && !images.includes(imgUrl)) {
                      images.push(imgUrl);
                    }
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

    // Fallback: Extract from HTML if JSON-LD didn't work
    if (!title) {
      title = $('h1[class*="product"], .product-title, [itemprop="name"]').first().text().trim() || 
              $('h1').first().text().trim() || 
              $('title').text().replace(/\s*\|.*$/, '').trim();
    }

    if (!description) {
      description = $('.product-description, [itemprop="description"], .description').first().text().trim() || null;
    }

    // Extract images from common Shopify selectors if not found in JSON-LD
    if (images.length === 0) {
      $('img[class*="product"], .product-image img, [data-product-image] img, .product__media img').each((_, element) => {
        const src = $(element).attr('src') || $(element).attr('data-src') || $(element).attr('data-lazy-src');
        if (src) {
          // Clean up Shopify CDN URLs (remove size parameters)
          let cleanSrc = src.split('?')[0];
          if (cleanSrc.includes('_')) {
            cleanSrc = cleanSrc.replace(/_\d+x\d+\./, '.');
          }
          // Ensure absolute URLs
          if (cleanSrc.startsWith('//')) {
            cleanSrc = 'https:' + cleanSrc;
          } else if (cleanSrc.startsWith('/')) {
            const urlObj = new URL(productUrl);
            cleanSrc = `${urlObj.protocol}//${urlObj.host}${cleanSrc}`;
          }
          if (!images.includes(cleanSrc)) {
            images.push(cleanSrc);
          }
        }
      });
    }

    // Extract videos
    $('video source, [data-product-video] source').each((_, element) => {
      const src = $(element).attr('src');
      if (src && !videos.includes(src)) {
        videos.push(src);
      }
    });

    return {
      title: title || 'Unknown Product',
      description,
      images,
      videos,
    };
  } catch (error: any) {
    throw new Error(`Failed to extract product from ${productUrl}: ${error.message}`);
  }
}
