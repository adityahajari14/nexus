export default function Footer() {
  return (
    <footer className="bg-white px-20 py-16 mt-24">
      <div className="max-w-[1440px] mx-auto flex justify-between">
        <div className="flex flex-col justify-between w-[560px]">
          <div className="flex flex-col gap-8">
            <img alt="Nexus Logo" className="h-[22px] w-[140px]" src="/logo.png" />
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-inter)] text-base text-[#484848] leading-[1.4] max-w-[420px]">
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
          <div className="flex justify-between items-end">
            <div className="flex gap-2.5">
              {/* Social media icons */}
            </div>
            <p className="text-xs text-[#484848] leading-[1.4] text-right">
              © 2021 — Copyright<br/>All Rights reserved
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[560px]">
          <div className="flex gap-10 text-base text-[#484848] leading-[1.4]">
            <p className="cursor-pointer hover:text-black">About.</p>
            <p className="cursor-pointer hover:text-black">Testimonials.</p>
            <p className="cursor-pointer hover:text-black">Pricing.</p>
            <p className="cursor-pointer hover:text-black">Contacts.</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-inter)] font-medium text-xl text-white tracking-[-0.2px]">
                  Contact Us
                </p>
                <div className="font-[family-name:var(--font-inter)] text-sm text-[#484848] leading-[1.6]">
                  <p>+1 (999) 888-77-66</p>
                  <p>hello@logoipsum.com</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-inter)] font-medium text-xl text-white tracking-[-0.2px]">
                  Location
                </p>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#484848] leading-[1.6]">
                  483920, Moscow,<br/>Myasnitskaya 22/2/5, Office 4
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-end">
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
