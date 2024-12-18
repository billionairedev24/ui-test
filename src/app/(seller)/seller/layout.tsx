import React from "react";
import SellerNavBar from "@/components/seller/SellerNavBar";
import SellerFooter from "@/components/seller/SellerFooter";

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
}) {


  return (
      <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 bg-white shadow-md">
              <SellerNavBar/>
          </header>

          <main className="flex-grow w-full">
              {children}
          </main>

          <footer className="mt-auto">
              <SellerFooter/>
          </footer>
      </div>
  )
}

