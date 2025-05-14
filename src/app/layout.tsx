import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatBubble } from "@/components/ChatBubble";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlameDuel - Digital Combat Arena",
  description: "The ultimate coding combat arena where Ghost King faces off against challengers in live coding battles.",
  icons: {
    icon: "/FlameOS_favicon.png",
    apple: "/FlameOS_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/FlameOS_favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white relative`}
        style={{
          backgroundImage: `url('/NODE_watermark.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'black',
        }}
      >
        <div className="relative z-10">
          {children}
          <ChatBubble />
        </div>
      </body>
    </html>
  );
}
