import Shell from "@/components/Shell";
import LegacyScripts from "@/components/LegacyScripts";
import "./globals.css";

export const metadata = {
  title: "STACK’D Burgers — Stack Higher. Bite Harder.",
  description:
    "STACK’D Burgers in Santa Rosa, Laguna. Big stacks, bigger cravings. Order pickup or delivery.",
  openGraph: {
    title: "STACK’D Burgers",
    description: "Stack Higher. Bite Harder.",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "STACK’D Burgers",
  servesCuisine: "Burgers",
  priceRange: "₱35–₱999",
  openingHours: "Mo-Su 10:00-22:00",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Rosa",
    addressRegion: "Laguna",
    addressCountry: "PH",
  },
};

// Apply saved theme before first paint (avoids a light/dark flash)
const themeInit = `try{var t=localStorage.getItem("stackd-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en-PH" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://irp.cdn-website.com/5b1077d2/dms3rep/multi/burger+gif+brandxr.gif"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Shell />
        {children}
        {/* Loads /public/js/* in order, after the shells above exist in the DOM */}
        <LegacyScripts />
      </body>
    </html>
  );
}
