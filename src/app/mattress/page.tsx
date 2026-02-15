import Link from "next/link";
import productsData from "../../../products.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MattressPage() {
  return (
    <div className="bg-[#f4f6ff] relative w-full min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-white px-20 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="font-[family-name:var(--font-poppins)] font-semibold text-5xl text-black">
              Our <span className="text-[#253f94]">Mattress</span> Collection
            </h1>
            <p className="font-[family-name:var(--font-poppins)] text-lg text-[#494949] max-w-[800px]">
              Discover the perfect mattress for your sleep needs. From plush comfort to firm support, we have the ideal solution for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-20 py-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between">
            <p className="font-[family-name:var(--font-poppins)] text-base text-[#494949]">
              Showing <span className="font-semibold text-black">{productsData.length}</span> products
            </p>
            <div className="flex gap-4">
              <select className="border border-[#d1d1d1] rounded-lg px-4 py-2 font-[family-name:var(--font-poppins)] text-base text-black bg-white hover:border-[#253f94] transition-colors cursor-pointer">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <select className="border border-[#d1d1d1] rounded-lg px-4 py-2 font-[family-name:var(--font-poppins)] text-base text-black bg-white hover:border-[#253f94] transition-colors cursor-pointer">
                <option>All Types</option>
                <option>Memory Foam</option>
                <option>Hybrid Spring</option>
                <option>Latex</option>
                <option>Orthopedic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-20 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-4 gap-6">
            {productsData.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-[280px]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-[#253f94] rounded-full px-3 py-1">
                      <p className="font-[family-name:var(--font-poppins)] text-sm text-white font-semibold">
                        -30%
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-[family-name:var(--font-inter)] text-base text-black capitalize mb-2 line-clamp-2">
                          {product.title}
                        </p>
                        <p className="font-[family-name:var(--font-inter)] font-semibold text-2xl text-black">
                          £{product.price}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 1l2.5 5.5L17 7.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1L9 1z" fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <button className="bg-white border border-[#c1c1c1] rounded-full p-3 hover:bg-gray-50 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
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
