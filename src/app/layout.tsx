import type { Metadata } from "next";
import { Poppins, Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Nexus - Mattress that Feels like Cloud",
  description: "Advanced tech. Award-winning comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
