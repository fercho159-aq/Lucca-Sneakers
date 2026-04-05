import type { Metadata } from 'next'

export const SITE_URL = 'https://www.luccasneakers.com'
export const SITE_NAME = 'Lucca Sneakers'

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lucca Sneakers | Tenis Premium en Tepito, CDMX',
    template: '%s | Lucca Sneakers',
  },
  description:
    'Explora nuestra colección de tenis premium. +200 modelos en tendencia de Nike, Adidas, Jordan, New Balance y Puma. Visítanos en Tepito, Ciudad de México. Venta al menudeo y mayoreo.',
  keywords: [
    'tenis',
    'sneakers',
    'tepito',
    'cdmx',
    'ciudad de mexico',
    'mayoreo',
    'nike',
    'adidas',
    'jordan',
    'new balance',
    'puma',
    'tenis premium',
    'zapatos deportivos',
    'calzado deportivo',
    'lucca sneakers',
    'tenis en tendencia',
    'tenis baratos cdmx',
  ],
  authors: [{ name: 'Lucca Sneakers' }],
  creator: 'Lucca Sneakers',
  publisher: 'Lucca Sneakers',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Lucca Sneakers | Tenis Premium en Tepito, CDMX',
    description:
      'Explora nuestra colección de tenis premium. +200 modelos en tendencia. Visítanos en Tepito, Ciudad de México.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lucca Sneakers - Tenis Premium en Tepito, CDMX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucca Sneakers | Tenis Premium en Tepito, CDMX',
    description:
      'Explora nuestra colección de tenis premium. +200 modelos en tendencia. Visítanos en Tepito, Ciudad de México.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

// JSON-LD for Organization / LocalBusiness
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'Lucca Sneakers',
    description:
      'Tienda de tenis premium en Tepito, CDMX. +200 modelos en tendencia de Nike, Adidas, Jordan, New Balance y Puma. Venta al menudeo y mayoreo.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/lucca-logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    telephone: '+527353884148',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tepito',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.4424,
      longitude: -99.1269,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/reel/DWWs5HUgWhb/?igsh=MXJ2ZGhrcHhlbXlyaA==',
      'https://www.facebook.com/share/r/1CMyZKt9Lv/?mibextid=wwXIfr',
      'https://vt.tiktok.com/ZSuK5hbfh/',
      'https://youtube.com/shorts/7kRpQbZ8OTM?si=Z-iJUiFFd3bgpzSs',
    ],
    priceRange: '$',
    currenciesAccepted: 'MXN',
    paymentAccepted: 'Cash, Credit Card',
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lucca Sneakers',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/catalogo?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getProductJsonLd(product: {
  name: string
  brand: string
  slug: string
  image: string | null
  priceRetail: number
  category: string
  sizes: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: product.image ? `${SITE_URL}${product.image}` : `${SITE_URL}/images/og-image.png`,
    description: `${product.name} de ${product.brand}. Disponible en Lucca Sneakers, Tepito, CDMX. Tallas: ${product.sizes.join(', ')}.`,
    category: product.category,
    url: `${SITE_URL}/catalogo/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.priceRetail,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Lucca Sneakers',
      },
    },
  }
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function getFAQPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
