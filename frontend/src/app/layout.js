import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import VantaBackground from "@/components/VantaBackground";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Infrnce - Intelligent Classification Engine",
  description:
    "Advanced log classification system with hybrid pipeline architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
          strategy="beforeInteractive"
        />
        <main id="vanta-bg" className="relative min-h-screen">
          <VantaBackground />
          <div className="relative z-10">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
