import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
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
    url: "https://batikgumregah.com",
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
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Batik Gumregah",
              description: "Traditional handcrafted batik studio from Kanten Village, Imogiri, Yogyakarta",
              url: "https://batikgumregah.com",
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
              image: "https://batikgumregah.com/images/og-image.jpg",
              priceRange: "Rp125.000 - Rp2.500.000",
              servesCuisine: "Batik",
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
