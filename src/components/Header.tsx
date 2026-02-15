"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Info Bar - Hidden on mobile */}
      <div className="bg-[#e6e6fc] hidden md:flex items-start px-4 md:px-8 xl:px-20 py-4">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h16v12H2V4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M2 4l8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base text-black underline">
              info@nexus.com
            </p>
          </div>
          <div className="flex items-center gap-4 lg:gap-8 xl:gap-12 font-[family-name:var(--font-poppins)] text-sm md:text-base text-black">
            <p className="underline cursor-pointer">Exchange</p>
            <p className="underline cursor-pointer">Warrenty</p>
            <p className="underline cursor-pointer">Returns</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="backdrop-blur-sm bg-white flex items-center justify-between px-4 md:px-8 xl:px-20 py-4 md:py-7 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <Link href="/">
            <img alt="Nexus Logo" className="h-[18px] w-[110px] md:h-[22px] md:w-[140px] cursor-pointer" src="/logo.png" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-16 font-[family-name:var(--font-inter)] font-medium text-base xl:text-lg text-[#525252]">
            <Link href="/mattress">
              <p className="cursor-pointer hover:text-black">Mattress</p>
            </Link>
            <p className="cursor-pointer hover:text-black">Beds</p>
            <p className="cursor-pointer hover:text-black">About Us</p>
            <p className="cursor-pointer hover:text-black">Layer Tech</p>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            {/* User Icon - Hidden on mobile */}
            <svg className="hidden md:block" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g clipPath="url(#clip0_1_44)">
              <path d="M21.5 15C21.5 16.0878 21.1774 17.1512 20.5731 18.0556C19.9687 18.9601 19.1098 19.6651 18.1048 20.0813C17.0998 20.4976 15.9939 20.6065 14.927 20.3943C13.8601 20.1821 12.8801 19.6583 12.1109 18.8891C11.3417 18.1199 10.8179 17.1399 10.6057 16.073C10.3935 15.0061 10.5024 13.9002 10.9187 12.8952C11.335 11.8902 12.0399 11.0313 12.9444 10.4269C13.8488 9.82257 14.9122 9.5 16 9.5C17.4582 9.50165 18.8562 10.0816 19.8873 11.1127C20.9184 12.1438 21.4984 13.5418 21.5 15ZM29 16C29 18.5712 28.2376 21.0846 26.8091 23.2224C25.3807 25.3603 23.3503 27.0265 20.9749 28.0104C18.5995 28.9944 15.9856 29.2518 13.4638 28.7502C10.9421 28.2486 8.6257 27.0105 6.80762 25.1924C4.98953 23.3743 3.75141 21.0579 3.2498 18.5362C2.74819 16.0144 3.00563 13.4006 3.98957 11.0251C4.97351 8.64968 6.63975 6.61935 8.77759 5.1909C10.9154 3.76244 13.4288 3 16 3C19.4467 3.00364 22.7512 4.37445 25.1884 6.81163C27.6256 9.24882 28.9964 12.5533 29 16ZM27 16C26.9984 14.5194 26.6982 13.0544 26.1174 11.6924C25.5366 10.3305 24.6871 9.09974 23.6198 8.07367C22.5524 7.04759 21.289 6.24732 19.9053 5.7207C18.5215 5.19408 17.0457 4.95194 15.5663 5.00875C9.67876 5.23625 4.98376 10.14 5.00001 16.0312C5.00565 18.7132 5.99478 21.2998 7.78001 23.3013C8.50703 22.2468 9.43056 21.3423 10.5 20.6375C10.5912 20.5773 10.6996 20.5486 10.8086 20.5558C10.9177 20.563 11.0213 20.6058 11.1038 20.6775C12.4627 21.8529 14.1995 22.4998 15.9963 22.4998C17.793 22.4998 19.5298 21.8529 20.8888 20.6775C20.9712 20.6058 21.0749 20.563 21.1839 20.5558C21.2929 20.5486 21.4013 20.5773 21.4925 20.6375C22.5633 21.342 23.4881 22.2464 24.2163 23.3013C26.0103 21.2925 27.0013 18.6932 27 16Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_1_44">
              <rect width="32" height="32" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-[34px] md:h-[34px]" viewBox="0 0 34 34" fill="none">
                <path d="M17.007 2.83331C20.8036 2.83331 23.9249 5.81668 24.0833 9.59694H24.0463C24.0508 9.70682 24.0296 9.81624 23.9846 9.91665H24.2058C25.9299 9.91665 27.7353 11.1116 28.4592 13.9964L28.5378 14.3367L29.6271 23.1125C30.411 28.7098 27.3487 31.0636 23.1713 31.1633L22.8912 31.1666H11.1471C6.90168 31.1666 3.63027 29.6196 4.34956 23.4933L4.39861 23.1125L5.50041 14.3367C6.0437 11.2302 7.86761 10.0048 9.625 9.92127L9.81993 9.91665H9.93067C9.912 9.81089 9.912 9.7027 9.93067 9.59694C10.0891 5.81668 13.2104 2.83331 17.007 2.83331ZM12.8874 14.6331C12.1959 14.6331 11.6354 15.2101 11.6354 15.9218C11.6354 16.6335 12.1959 17.2105 12.8874 17.2105C13.5789 17.2105 14.1394 16.6335 14.1394 15.9218L14.1297 15.7602C14.0524 15.1247 13.5257 14.6331 12.8874 14.6331ZM21.0882 14.6331C20.3968 14.6331 19.8362 15.2101 19.8362 15.9218C19.8362 16.6335 20.3968 17.2105 21.0882 17.2105C21.7797 17.2105 22.3403 16.6335 22.3403 15.9218C22.3403 15.2101 21.7797 14.6331 21.0882 14.6331ZM16.9515 4.67836C14.2257 4.67836 12.0159 6.88048 12.0159 9.59694C12.0346 9.7027 12.0346 9.81089 12.0159 9.91665H21.9487C21.9093 9.81457 21.8884 9.70631 21.887 9.59694C21.887 6.88048 19.6773 4.67836 16.9515 4.67836Z" fill="black"/>
              </svg>
              <div className="absolute -top-1 -right-1 bg-[#253f94] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                <span className="text-white text-[10px] md:text-xs font-semibold">0</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 px-4 py-6">
          <nav className="flex flex-col gap-6 font-[family-name:var(--font-inter)] font-medium text-lg text-[#525252]">
            <Link href="/mattress" onClick={() => setMobileMenuOpen(false)}>
              <p className="cursor-pointer hover:text-black border-b border-gray-200 pb-4">Mattress</p>
            </Link>
            <p className="cursor-pointer hover:text-black border-b border-gray-200 pb-4">Beds</p>
            <p className="cursor-pointer hover:text-black border-b border-gray-200 pb-4">About Us</p>
            <p className="cursor-pointer hover:text-black border-b border-gray-200 pb-4">Layer Tech</p>
            <div className="border-b border-gray-200 pb-4">
              <p className="cursor-pointer hover:text-black">Exchange</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="cursor-pointer hover:text-black">Warrenty</p>
            </div>
            <div className="pb-4">
              <p className="cursor-pointer hover:text-black">Returns</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
