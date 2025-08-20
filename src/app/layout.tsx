import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });


export const metadata: Metadata = {
title: "Kartu Ucapan Ulang Tahun",
description: "Kartu ucapan ulang tahun cantik, mudah dibagikan.",
openGraph: {
title: "Kartu Ucapan Ulang Tahun",
description: "Kartu ucapan ulang tahun cantik, mudah dibagikan.",
images: [
{
url: "/api/og?to=Kekasih&msg=Selamat%20ulang%20tahun%20sayang!",
width: 1200,
height: 630,
},
],
},
icons: [{ rel: "icon", url: "/favicon.svg" }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="id" className="h-full">
{/* remove font-sans utility and let globals.css control the font via --font-inter */}
<body className={cn("min-h-screen antialiased", inter.variable, playfair.variable)}>
{children}
</body>
</html>
);
}