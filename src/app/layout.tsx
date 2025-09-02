import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });


export const metadata: Metadata = {
title: "Selamat Ulang Tahun Cosmas Putra Kristanto",
description: "Happy Birthday Sayang! Semoga sehat, bahagia, dan semua harapan kamu tercapai.",
openGraph: {
title: "Selamat Ulang Tahun Cosmas Putra Kristanto",
description: "Happy Birthday Sayang! Semoga sehat, bahagia, dan semua harapan kamu tercapai.",
images: [
{
url: "/bersama.jpg",
width: 1200,
height: 630,
},
],
},
icons: [{ rel: "icon", url: "/favicon.svg" }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="id" className="h-full scroll-smooth">
{/* scroll-snap di body untuk efek snap per section */}
<body className={cn("min-h-screen antialiased snap-y snap-mandatory", inter.variable, playfair.variable)}>
{children}
</body>
</html>
);
}