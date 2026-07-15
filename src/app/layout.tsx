 import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Cormorant_Garamond, Poppins } from "next/font/google";

// Self-hosted via next/font — eliminates render-blocking Google Fonts request
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
  preload: false, // only preload the critical heading font
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://batikgumregah.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Batik Gumregah | Handcrafted Batik from Kanten Village, Yogyakarta",
      template: "%s | Batik Gumregah",
    },
    description:
      "Batik Gumregah is a traditional handcrafted batik studio from Kanten Village, Imogiri, Yogyakarta. Every pattern tells a story of Javanese heritage and culture. UNESCO recognized batik.",
    keywords: [
      "batik gumregah", "batik imogiri", "batik kanten", "batik yogyakarta",
      "batik tulis", "batik cap", "batik handmade", "javanese batik",
      "batik indonesia", "wastra nusantara", "batik premium",
    ],
    authors: [{ name: "Batik Gumregah" }],
    creator: "Batik Gumregah",
    openGraph: {
      type: "website",
      locale: "id_ID",
      alternateLocale: "en_US",
      url: baseUrl,
      siteName: "Batik Gumregah",
      title: "Batik Gumregah | Handcrafted Batik from Yogyakarta",
      description: "Traditional handcrafted batik from Kanten Village, Imogiri, Yogyakarta. Preserving Javanese heritage through every stroke.",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Batik Gumregah" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Batik Gumregah | Handcrafted Batik from Yogyakarta",
      description: "Traditional handcrafted batik from Kanten Village, Imogiri, Yogyakarta.",
      images: ["/images/og-image.jpg"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: [
        { url: "/images/logo.png", type: "image/png" },
        { url: "/favicon.ico" }
      ],
      apple: "/images/logo.png"
    },
    manifest: "/site.webmanifest",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${cormorant.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Batik Gumregah",
              alternateName: "Batik Gumregah - Semangat dan Bangkit",
              description: "Batik Gumregah adalah studio batik tulis dari Desa Kanten, Imogiri, Yogyakarta. Nama \"Gumregah\" bermakna Semangat dan Bangkit — dipilih sebagai pemacu semangat untuk terus berinovasi menghasilkan karya batik berkualitas tinggi.",
              url: baseUrl,
              logo: `${baseUrl}/images/logo.png`,
              image: [`${baseUrl}/images/logo.png`, `${baseUrl}/images/og-image.jpg`],
              telephone: "+62-274-000000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Desa Kanten, Kecamatan Imogiri",
                addressLocality: "Bantul",
                addressRegion: "Daerah Istimewa Yogyakarta",
                postalCode: "55782",
                addressCountry: "ID",
              },
              geo: { "@type": "GeoCoordinates", latitude: -7.9469, longitude: 110.4123 },
              openingHours: "Mo-Sa 08:00-17:00",
              priceRange: "Rp125.000 - Rp2.500.000",
              sameAs: [
                "https://instagram.com/batik_gumregah"
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
