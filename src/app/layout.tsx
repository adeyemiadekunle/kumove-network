import type { Metadata } from "next";
import { QueryClientProviders } from "./providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Kumove",
    template: "%s | Kumove",
  },
  metadataBase: new URL(siteUrl),
  description:
    "Kumove helps businesses and people send and receive parcels across Nigeria through a smarter city delivery network.",
  keywords: [
    "delivery in Nigeria",
    "send parcels to family and friends",
    "same-day delivery",
    "parcel collection points",
    "Lagos delivery network",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Kumove",
    title: "Kumove | Delivery, redrawn",
    description: "Send and receive parcels across Nigeria with a smarter, more local delivery network.",
  },
  twitter: {
    card: "summary",
    title: "Kumove | Delivery, redrawn",
    description: "Send and receive parcels across Nigeria with a smarter, more local delivery network.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Kumove",
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        description: "A smarter delivery network helping businesses and people send and receive parcels across Nigeria.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Kumove",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <QueryClientProviders>{children}</QueryClientProviders>
      </body>
    </html>
  );
}
