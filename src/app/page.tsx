import Image from "next/image";
import Link from "next/link";
import productsData from "../../products.json";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const products = productsData.slice(0, 4);
  return (
    <div className="bg-[#f4f6ff] relative w-full">
      <Header />

      {/* Hero Section */}
      <div className="bg-white h-[709px] relative overflow-hidden">
        <img 
          alt="Mattress with clouds" 
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-img.jpg"
        />
        <div className="absolute inset-0 bg-[#f4f6ff] mix-blend-hue" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[286px] flex flex-col items-center gap-7 w-[904px]">
          <div className="flex flex-col items-center text-center w-full">
            <p className="font-[family-name:var(--font-poppins)] font-medium text-[44px] leading-[1.38] tracking-[-0.44px] text-black capitalize">
              Mattress that Feels like Cloud
            </p>
            <p className="font-[family-name:var(--font-poppins)] text-2xl leading-[1.38] tracking-[-0.24px] text-black capitalize">
              Advanced tech. Award-winning comfort.
            </p>
          </div>
          <button className="bg-[#253f94] text-white font-[family-name:var(--font-poppins)] text-base capitalize rounded-[25px] px-10 py-2.5 hover:bg-[#1e3278] transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Blur divider */}
      <div className="bg-[#f4f6ff] blur-[24.7px] h-40 w-full" />

      {/* Made With Our In House Technology Section */}
      <div className="flex justify-center px-20">
        <div className="w-full max-w-[1440px]">
          <div className="bg-[#253f94] rounded-lg overflow-hidden relative h-[264px]">
            <div className="absolute left-[59px] top-[31px] flex flex-col gap-[13px] max-w-[600px]">
              <h2 className="font-[family-name:var(--font-poppins)] font-medium text-[32px] leading-[1.38] tracking-[-0.32px] text-white capitalize">
                Help Us Find A Perfect Mattress For You
              </h2>
              <p className="font-[family-name:var(--font-poppins)] text-[16px] leading-[1.38] tracking-[-0.16px] text-white capitalize">
                Take Our Mattress Quiz And Let Us Find Perfect Mattress For You
              </p>
              <button className="bg-white text-[#253f94] font-[family-name:var(--font-poppins)] text-[16px] capitalize rounded-[25px] px-10 py-2.5 w-[215px] hover:bg-gray-100 transition-colors mt-[12px]">
                Take Quiz
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[497px] h-[491px] flex items-center justify-center">
              <div className="rotate-[9.88deg]">
                <img 
                  alt="Floating illustration" 
                  className="w-[431px] h-[424px]"
                  src="/quiz-icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Made With Our In House Technology - Features */}
      <div className="bg-white flex justify-center px-20 py-20 mt-24">
        <div className="w-full max-w-[1440px]">
          <div className="flex gap-24 items-start">
            <div className="flex-none w-[548px]">
              <img 
                alt="Mattress layers" 
                className="w-full h-auto"
                src="/mattress-layers.png"
              />
            </div>
            <div className="flex-1 flex flex-col gap-8 pt-12">
              <h3 className="font-[family-name:var(--font-poppins)] font-medium text-3xl leading-tight text-black capitalize">
                Made with our In House <span className="text-[#253f94]">Technology</span>
              </h3>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_1_152)">
                    <path d="M20 10V30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.25 6.25L20 10L23.75 6.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.25 33.75L20 30L23.75 33.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3391 15L28.6609 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.25 16.25L11.3391 15L10 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M30 30L28.6609 25L33.75 23.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3391 25L28.6609 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 30L11.3391 25L6.25 23.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M33.75 16.25L28.6609 15L30 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_152">
                    <rect width="40" height="40" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-xl leading-relaxed text-black capitalize">
                    Stratos® 'cool-touch' tech
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-base leading-relaxed text-black capitalize">
                    Designed for instant and all-night coolness, think of this innovative tech as your sleep thermostat.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_1_152)">
                    <path d="M20 10V30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.25 6.25L20 10L23.75 6.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.25 33.75L20 30L23.75 33.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3391 15L28.6609 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.25 16.25L11.3391 15L10 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M30 30L28.6609 25L33.75 23.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3391 25L28.6609 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 30L11.3391 25L6.25 23.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M33.75 16.25L28.6609 15L30 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_152">
                    <rect width="40" height="40" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-xl leading-relaxed text-black capitalize">
                    Aerocoil® Springs
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-base leading-relaxed text-black capitalize">
                    Our patented titanium alloy springs respond to you for tailored body support and optimum airflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="flex justify-center px-20 mt-24">
        <div className="w-full max-w-[1440px]">
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl text-black mb-12">
            Best Selling <span className="text-[#253f94]">Product</span>
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-[280px]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
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

      {/* Why Nexus Section */}
      <div className="bg-white px-20 py-20 mt-24">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl text-black capitalize">
            Why <span className="text-[#253f94]">Nexus?</span>
          </h2>
          <div className="flex gap-12">
            <div className="flex-none w-[653px] h-[456px] rounded-lg overflow-hidden relative">
              <img 
                alt="Next Gen Mattress" 
                className="absolute inset-0 w-full h-full object-cover"
                src="/why-nexus.jpg"
              />
              <div className="absolute inset-0" style={{background: 'linear-gradient(250deg, rgba(0,0,0,0) 1.86%, rgba(0,0,0,0.61) 92.13%)'}} />
              <button className="absolute left-8 top-[315px] backdrop-blur-[2px] bg-white/8 border border-white rounded-[30px] px-3 py-2 flex items-center gap-2 hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3l12 7-12 7V3z" fill="white"/>
                </svg>
                <span className="font-[family-name:var(--font-poppins)] font-medium text-lg text-white capitalize">
                  Watch Now
                </span>
              </button>
              <p className="absolute left-8 bottom-8 font-[family-name:var(--font-poppins)] font-semibold text-[32px] text-white capitalize">
                Next Gen Mattress
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-8 justify-center">
              <div className="flex gap-6 items-center">
                <div className="bg-[#f0f4ff] border border-[#f0f4ff] rounded-lg w-[100px] h-[100px] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_1_330)">
                    <path d="M32.5 6.25H7.5C6.80964 6.25 6.25 6.80964 6.25 7.5V32.5C6.25 33.1904 6.80964 33.75 7.5 33.75H32.5C33.1904 33.75 33.75 33.1904 33.75 32.5V7.5C33.75 6.80964 33.1904 6.25 32.5 6.25Z" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M27.5 3.75V8.75" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 3.75V8.75" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.25 13.75H33.75" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 22.5C21.0355 22.5 21.875 21.6605 21.875 20.625C21.875 19.5895 21.0355 18.75 20 18.75C18.9645 18.75 18.125 19.5895 18.125 20.625C18.125 21.6605 18.9645 22.5 20 22.5Z" fill="#253F94"/>
                    <path d="M26.875 22.5C27.9105 22.5 28.75 21.6605 28.75 20.625C28.75 19.5895 27.9105 18.75 26.875 18.75C25.8395 18.75 25 19.5895 25 20.625C25 21.6605 25.8395 22.5 26.875 22.5Z" fill="#253F94"/>
                    <path d="M13.125 28.75C14.1605 28.75 15 27.9105 15 26.875C15 25.8395 14.1605 25 13.125 25C12.0895 25 11.25 25.8395 11.25 26.875C11.25 27.9105 12.0895 28.75 13.125 28.75Z" fill="#253F94"/>
                    <path d="M20 28.75C21.0355 28.75 21.875 27.9105 21.875 26.875C21.875 25.8395 21.0355 25 20 25C18.9645 25 18.125 25.8395 18.125 26.875C18.125 27.9105 18.9645 28.75 20 28.75Z" fill="#253F94"/>
                    <path d="M26.875 28.75C27.9105 28.75 28.75 27.9105 28.75 26.875C28.75 25.8395 27.9105 25 26.875 25C25.8395 25 25 25.8395 25 26.875C25 27.9105 25.8395 28.75 26.875 28.75Z" fill="#253F94"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_330">
                    <rect width="40" height="40" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-[20px] text-black capitalize mb-2">
                    10 year Warrenty
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-relaxed">
                    Our sleep technology is built to last so we've got your back for a decade. If it fails during that tim
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="bg-[#f0f4ff] border border-[#f0f4ff] rounded-lg w-[100px] h-[100px] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_1_346)">
                    <path d="M17.5 26.25V12.5H33.75C35.0761 12.5 36.3479 13.0268 37.2855 13.9645C38.2232 14.9021 38.75 16.1739 38.75 17.5V26.25" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.75 32.5V7.5" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.75 26.25H38.75V32.5" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.5 12.5H3.75" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_346">
                    <rect width="40" height="40" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-xl text-black capitalize mb-3">
                    200 Day Trial
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-[1.53]">
                    Our sleep technology is built to last so we've got your back for a decade. If it fails during that tim
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="bg-[#f0f4ff] border border-[#f0f4ff] rounded-lg w-[100px] h-[100px] flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_1_357)">
                    <path d="M20 29.5454L28.55 34.8032C28.7719 34.9379 29.0286 35.0038 29.2879 34.9925C29.5472 34.9813 29.7973 34.8935 30.0067 34.7401C30.216 34.5868 30.3752 34.3748 30.4642 34.131C30.5531 33.8872 30.5677 33.6225 30.5063 33.3704L28.1813 23.5595L35.7907 16.997C35.9847 16.8266 36.1245 16.6032 36.193 16.3542C36.2615 16.1053 36.2556 15.8417 36.176 15.5961C36.0964 15.3505 35.9466 15.1336 35.7451 14.9721C35.5436 14.8107 35.2993 14.7118 35.0422 14.6876L25.0563 13.8751L21.2094 4.56259C21.1113 4.32234 20.9439 4.11674 20.7285 3.97201C20.5131 3.82729 20.2595 3.75 20 3.75C19.7405 3.75 19.4869 3.82729 19.2715 3.97201C19.0561 4.11674 18.8887 4.32234 18.7907 4.56259L14.9438 13.8751L4.95784 14.6876C4.69904 14.7103 4.45267 14.8088 4.24951 14.9707C4.04636 15.1327 3.89543 15.3509 3.81557 15.5981C3.73572 15.8453 3.73049 16.1106 3.80054 16.3608C3.87058 16.611 4.01279 16.835 4.2094 17.0048L11.8188 23.5673L9.49378 33.3704C9.43231 33.6225 9.44697 33.8872 9.5359 34.131C9.62482 34.3748 9.78403 34.5868 9.99339 34.7401C10.2028 34.8935 10.4529 34.9813 10.7121 34.9925C10.9714 35.0038 11.2282 34.9379 11.45 34.8032L20 29.5454Z" stroke="#253F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_357">
                    <rect width="40" height="40" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-poppins)] font-medium text-xl text-black capitalize mb-3">
                    3500+Ratings
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-[1.53]">
                    Our sleep technology is built to last so we've got your back for a decade. If it fails during that tim
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="px-20 mt-24">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl text-black mb-12">
            Blogs
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <div className="h-[393px] rounded-lg overflow-hidden">
                <img 
                  alt="Blog" 
                  className="w-full h-full object-cover"
                  src="/blog-1.jpg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-poppins)] font-medium text-2xl text-black capitalize leading-tight">
                  The Science of a Good Night's Sleep
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-relaxed">
                  How your mattress plays a bigger role in your health than you think.
                </p>
                <button className="bg-white border border-[#253f94] text-[#253f94] font-[family-name:var(--font-poppins)] text-base capitalize rounded-[25px] px-10 py-2.5 w-[215px] hover:bg-[#253f94] hover:text-white transition-colors">
                  Read More
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="h-[393px] rounded-lg overflow-hidden">
                <img 
                  alt="Blog" 
                  className="w-full h-full object-cover"
                  src="/blog-2.jpg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-poppins)] font-medium text-2xl text-black capitalize leading-tight">
                  Sleep Better, Live Better
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-relaxed">
                  Discover the link between quality sleep and daily performance.
                </p>
                <button className="bg-white border border-[#253f94] text-[#253f94] font-[family-name:var(--font-poppins)] text-base capitalize rounded-[25px] px-10 py-2.5 w-[215px] hover:bg-[#253f94] hover:text-white transition-colors">
                  Read More
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="h-[393px] rounded-lg overflow-hidden">
                <img 
                  alt="Blog" 
                  className="w-full h-full object-cover"
                  src="/blog-3.jpg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-poppins)] font-medium text-2xl text-black capitalize leading-tight">
                  The Science of a Good Night's Sleep
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-lg text-black capitalize leading-relaxed">
                  How your mattress plays a bigger role in your health than you think.
                </p>
                <button className="bg-white border border-[#253f94] text-[#253f94] font-[family-name:var(--font-poppins)] text-base capitalize rounded-[25px] px-10 py-2.5 w-[215px] hover:bg-[#253f94] hover:text-white transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-20 mt-24">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl text-black mb-12">
            Testimonials
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg p-8 min-h-[400px] flex flex-col justify-between">
                <p className="font-[family-name:var(--font-poppins)] text-lg text-[#1e1e1e] leading-relaxed">
                  "I didn't realize how much my old mattress was affecting my sleep until I switched. Now, I wake up feeling genuinely rested — no back pain, no tossing and turning. Worth every penny!"
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-[family-name:var(--font-inter)] font-bold text-xl text-black">
                      Maxin Will
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-lg text-black/60">
                      Nexus Flux Mattress User
                    </p>
                  </div>
                  <svg className="w-[185px] h-8" viewBox="0 0 185 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2l4 8 9 1.5-6.5 6.5 1.5 9L16 23l-8 4 1.5-9L3 11.5l9-1.5 4-8z" fill="#1C55E0"/>
                    <path d="M51 2l4 8 9 1.5-6.5 6.5 1.5 9L51 23l-8 4 1.5-9L38 11.5l9-1.5 4-8z" fill="#1C55E0"/>
                    <path d="M86 2l4 8 9 1.5-6.5 6.5 1.5 9L86 23l-8 4 1.5-9L73 11.5l9-1.5 4-8z" fill="#1C55E0"/>
                    <path d="M121 2l4 8 9 1.5-6.5 6.5 1.5 9-8-4-8 4 1.5-9-6.5-6.5 9-1.5 4-8z" fill="#1C55E0"/>
                    <path d="M156 2l4 8 9 1.5-6.5 6.5 1.5 9-8-4-8 4 1.5-9-6.5-6.5 9-1.5 4-8z" fill="#1C55E0"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
