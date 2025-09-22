import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { seoConfig } from "@/lib/data";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords.join(", "),
    authors: [{ name: "Brhane Giday", url: "https://brhane-giday.vercel.app" }],
    creator: "Brhane Giday",
    metadataBase: new URL(seoConfig.canonicalUrl),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: seoConfig.canonicalUrl,
        siteName: "Brhane Giday Portfolio",
        title: seoConfig.title,
        description: seoConfig.description,
        images: [
            {
                url: seoConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "Brhane Giday - Software Engineer & AI Researcher",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={cn("min-h-screen bg-background font-sans antialiased scroll-smooth", inter.variable)}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
