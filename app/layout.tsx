import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollBackground from "@/components/ScrollBackground";
import CommandPalette from "@/components/CommandPalette";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Satoshi (self-hosted variable, 300–900) — characterful grotesque that
// carries both display and body roles without reading as a template face
const sans = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Software Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Sangat Sharma",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Nepal",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} · Software Engineer`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Software Engineer`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: site.email,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "BlackTech" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Frontend Architecture"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-base"
        >
          Skip to content
        </a>
        <Preloader />
        <ScrollBackground />
        <div aria-hidden className="grain" />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <CommandPalette />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
