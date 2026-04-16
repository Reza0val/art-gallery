import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Art Gallery",
    template: "%s | Art Gallery",
  },
  description: "A minimal private art collection website with inquiry flow.",
  metadataBase: new URL("https://art-gallery-seven-mu.vercel.app"),
  openGraph: {
    title: "Art Gallery",
    description: "A minimal private art collection website with inquiry flow.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Gallery",
    description: "A minimal private art collection website with inquiry flow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
