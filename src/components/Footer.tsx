export default function Footer() {
  return (
    <footer className="bg-white px-4 md:px-8 xl:px-20 py-12 md:py-16 mt-12 md:mt-24">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
        <div className="flex flex-col justify-between w-full lg:w-[560px]">
          <div className="flex flex-col gap-6 md:gap-8">
            <img alt="Nexus Logo" className="h-[20px] w-[125px] md:h-[22px] md:w-[140px]" src="/logo.png" />
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-[#484848] leading-[1.4] max-w-[420px]">
                Mattress that Feels like Cloud
              </p>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-xs text-white">
                  More about us
                </p>
                <div className="bg-white rounded-[10px] w-2.5 h-2.5" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-8 lg:mt-0">
            <div className="flex gap-2.5">
              {/* Social media icons */}
            </div>
            <p className="text-xs text-[#484848] leading-[1.4] text-right">
              © 2021 — Copyright<br/>All Rights reserved
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full lg:w-[560px]">
          <div className="flex flex-wrap gap-6 md:gap-10 text-sm md:text-base text-[#484848] leading-[1.4]">
            <p className="cursor-pointer hover:text-black">About.</p>
            <p className="cursor-pointer hover:text-black">Testimonials.</p>
            <p className="cursor-pointer hover:text-black">Pricing.</p>
            <p className="cursor-pointer hover:text-black">Contacts.</p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-8 mt-8 lg:mt-0">
            <div className="flex flex-col gap-8 md:gap-12">
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-inter)] font-medium text-lg md:text-xl text-white tracking-[-0.2px]">
                  Contact Us
                </p>
                <div className="font-[family-name:var(--font-inter)] text-sm text-[#484848] leading-[1.6]">
                  <p>+1 (999) 888-77-66</p>
                  <p>hello@logoipsum.com</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-inter)] font-medium text-lg md:text-xl text-white tracking-[-0.2px]">
                  Location
                </p>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#484848] leading-[1.6]">
                  483920, Moscow,<br/>Myasnitskaya 22/2/5, Office 4
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <p className="font-semibold text-xs text-white">
                Languages
              </p>
              <div className="flex gap-5 text-sm">
                <p className="text-white cursor-pointer hover:text-gray-300">En</p>
                <p className="text-[#484848] cursor-pointer hover:text-black">Es</p>
                <p className="text-[#484848] cursor-pointer hover:text-black">Fr</p>
                <p className="text-[#484848] cursor-pointer hover:text-black">De</p>
                <p className="text-[#484848] cursor-pointer hover:text-black">Ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
