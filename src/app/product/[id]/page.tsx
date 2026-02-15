import productsData from "../../../../products.json";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white relative w-full">
      <Header />

      {/* Product Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-20 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Images */}
          <div className="flex flex-col gap-4 w-full lg:w-[480px] xl:w-[580px]">
            <div className="bg-[#f5f7ff] w-full h-[280px] md:h-[350px] xl:h-[400px] overflow-hidden rounded-lg">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 md:gap-3 overflow-x-auto">
              {product.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className={`bg-[#f5f7ff] w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex-shrink-0 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${index === 0 ? 'border-2 border-[#253f94]' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col gap-3 md:gap-4 flex-1">
            {/* Rating */}
            <div className="border border-[#d1d1d1] rounded-lg px-3 py-2 w-fit">
              <div className="flex gap-3 items-center">
                <svg className="w-5 h-5" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5"/>
                </svg>
                <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-black">
                  4.5 | 342 Reviews
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <h1 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl text-[#141414] leading-tight">
                    {product.title}
                  </h1>
                  <div className="flex gap-2 md:gap-3 items-center">
                    <p className="font-[family-name:var(--font-poppins)] font-semibold text-2xl md:text-3xl text-black">
                      £{product.price}
                    </p>
                    <p className="font-[family-name:var(--font-poppins)] text-lg md:text-xl text-[#888] line-through">
                      £{(parseFloat(product.price) * 1.3).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <div className="bg-[rgba(37,63,148,0.05)] border border-[#253f94] rounded-full px-4 py-2">
                    <p className="font-[family-name:var(--font-poppins)] text-sm text-[#253f94]">
                      Spring Technology
                    </p>
                  </div>
                  <div className="bg-[rgba(37,63,148,0.05)] border border-[#253f94] rounded-full px-4 py-2">
                    <p className="font-[family-name:var(--font-poppins)] text-sm text-[#253f94]">
                      10 Year Warrenty
                    </p>
                  </div>
                  <div className="bg-[rgba(37,63,148,0.05)] border border-[#253f94] rounded-full px-4 py-2">
                    <p className="font-[family-name:var(--font-poppins)] text-sm text-[#253f94]">
                      Orthopedic Mattress
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="border border-[#253f94] rounded-lg flex-1 h-12 flex items-center justify-center hover:bg-[#253f94] hover:text-white transition-colors">
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-base text-[#253f94] capitalize hover:text-white">
                    Compare
                  </p>
                </button>
                <button className="bg-[#253f94] rounded-lg flex-1 h-12 flex items-center justify-center hover:bg-[#1e3278] transition-colors">
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-base text-white capitalize">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>

            {/* Learn with Nexus */}
            <div className="border border-[#a6bbff] rounded-lg min-h-[80px] md:h-20 overflow-hidden relative p-4 md:p-0" style={{ background: 'linear-gradient(96.06deg, #ABBFFF 0.22%, #E6F0FC 100%)' }}>
              <div className="md:absolute md:left-4 md:top-4">
                <p className="font-[family-name:var(--font-poppins)] font-medium text-sm md:text-base text-black capitalize">
                  Learn with Nexus
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-xs md:text-sm text-black capitalize">
                  What is Plush Mattress
                </p>
              </div>
              <button className="md:absolute right-4 top-1/2 md:-translate-y-1/2 mt-3 md:mt-0 backdrop-blur-[2px] bg-white/8 border border-[#253f94] rounded-full px-3 md:px-4 py-2 flex items-center gap-2 hover:bg-white/20 transition-colors">
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3l12 7-12 7V3z" fill="#253f94"/>
                </svg>
                <p className="font-[family-name:var(--font-poppins)] font-medium text-xs md:text-sm text-[#253f94] capitalize">
                  Watch Now
                </p>
              </button>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="font-[family-name:var(--font-poppins)] font-medium text-sm md:text-base text-black capitalize">
                Choose Your Mattress Size
              </p>
              <div className="border border-[#515151] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[#253f94] transition-colors">
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-sm text-black capitalize">
                  King: W 250, L 355, H 242
                </p>
                <svg className="w-5 h-5" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10.5l7 7 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section 1 */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center mt-8 md:mt-16">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-xl md:text-2xl text-[#141414]">
              Comfort-boosting Aerocoil® microsprings
            </h2>
            <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-[#494949] leading-relaxed">
              What's behind our "sleeping-on-a-cloud" feel? Our titanium alloy Aerocoil® microsprings. We proudly place them at the top of our Essential, where comfort matters most, where there's up to 1,000 for pinpoint support. As they compress individually, they push fresh air upwards and respond separately to movement – so you feel cooler, and your partner's toss-and-turns stay on their side.
            </p>
          </div>
          <div className="bg-[#323670] h-[320px] flex-1 rounded-lg overflow-hidden">
            <img 
              src={product.images[0]} 
              alt="Aerocoil microsprings"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Feature Section 2 */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center mt-8 md:mt-16">
          <div className="bg-[#323670] h-[200px] md:h-[280px] lg:h-[320px] flex-1 rounded-lg overflow-hidden order-first">
            <img 
              src={product.images[0]} 
              alt="Comfort features"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-2xl text-[#141414]">
              Comfort-boosting Aerocoil® microsprings
            </h2>
            <p className="font-[family-name:var(--font-poppins)] text-base text-[#494949] leading-relaxed">
              What's behind our "sleeping-on-a-cloud" feel? Our titanium alloy Aerocoil® microsprings. We proudly place them at the top of our Essential, where comfort matters most, where there's up to 1,000 for pinpoint support. As they compress individually, they push fresh air upwards and respond separately to movement – so you feel cooler, and your partner's toss-and-turns stay on their side.
            </p>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8 md:mt-16 bg-white rounded-lg p-4 md:p-8">
          <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-xl md:text-2xl text-[#141414] mb-4 md:mb-6">
            Product Description
          </h2>
          <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-[#494949] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Customer Reviews */}
        <div className="mt-8 md:mt-16 bg-white rounded-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
            <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-xl md:text-2xl text-[#141414]">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5"/>
                  </svg>
                ))}
              </div>
              <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-[#494949]">
                4.5 out of 5 (342 reviews)
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <p className="font-[family-name:var(--font-poppins)] font-semibold text-sm md:text-base text-[#141414]">
                        Sarah Johnson
                      </p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-poppins)] text-sm text-[#888]">
                      Verified Purchase • 2 weeks ago
                    </p>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-[#494949] leading-relaxed">
                  Best mattress I've ever owned! The support is incredible and I wake up without any back pain. The cooling technology really works too. Highly recommend for anyone looking for a quality mattress.
                </p>
              </div>
            ))}
          </div>

          <button className="mt-6 border border-[#253f94] rounded-lg px-4 md:px-6 py-2 md:py-3 hover:bg-[#253f94] hover:text-white transition-colors">
            <p className="font-[family-name:var(--font-poppins)] font-medium text-sm md:text-base text-[#253f94] hover:text-white">
              Load More Reviews
            </p>
          </button>
        </div>

        {/* Related Products */}
        <div className="mt-8 md:mt-16">
          <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-xl md:text-2xl text-[#141414] mb-6 md:mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {productsData.slice(0, 4).filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-[#f5f7ff] h-[180px] md:h-[200px] overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[family-name:var(--font-poppins)] font-medium text-sm md:text-base text-[#141414] mb-2 line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="font-[family-name:var(--font-poppins)] font-semibold text-base md:text-lg text-black">
                        £{relatedProduct.price}
                      </p>
                      <p className="font-[family-name:var(--font-poppins)] text-xs md:text-sm text-[#888] line-through">
                        £{(parseFloat(relatedProduct.price) * 1.3).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
