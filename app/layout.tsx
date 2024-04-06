import { cn } from "@/lib/utils";
import CartProvider from "@/providers/Cart-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "./components/footer/footer";
import { Navbar } from "./components/nav/navbar";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(poppins.className, "text-slate-700")}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
