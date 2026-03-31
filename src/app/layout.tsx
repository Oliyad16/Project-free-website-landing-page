import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Living Stone Solutions — Get a Free Professional Website",
  description:
    "Professionally built websites for small businesses. Human-supervised, tailored to your brand. Get yours free — upgrade only when you're ready to grow.",
  openGraph: {
    title: "Living Stone Solutions — Get a Free Professional Website",
    description:
      "Professionally built websites for small businesses. Human-supervised, tailored to your brand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0b10] text-[#F5EFE0]">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
