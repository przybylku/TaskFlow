import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import React from "react";
import Provider from '@/components/Provider'
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500" , "600", "700", "800"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

interface props {
  children: JSX.Element
}

export default function RootLayout({ children }: props): JSX.Element {
  return (
    <html lang="en">
      <body className={poppins.className}><Provider>{children}</Provider></body>
    </html>
  );
}
