import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Hind_Siliguri } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { UserProvider } from "@/components/providers/user-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const volteBangla = Hind_Siliguri({
  variable: "--font-volte-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://insyt.co"),
  title: {
    default: "CAREERINSYT — Career OS",
    template: "%s | CAREERINSYT",
  },
  description:
    "Level up your career with CAREERINSYT. The Career OS for business analytics, corporate modeling, AI productivity, and media production.",
  keywords: [
    "career development",
    "corporate training",
    "video editing",
    "financial modeling",
    "business intelligence",
    "professional development",
    "AI productivity",
    "CAREERINSYT",
    "Career OS",
  ],
  authors: [{ name: "CAREERINSYT" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CAREERINSYT",
    title: "CAREERINSYT — Career OS",
    description:
      "Level up your skills. Master video editing, presentation engineering, AI automation, and GRE preparation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INSYT Corporate — The Career Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INSYT Corporate",
    description: "The Career Operating System.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo/logo_white.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo/logo_white.png",
    apple: "/logo/logo_white.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CAREERINSYT",
  },
};

import { LanguageProvider } from "@/components/providers/language-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.remove('dark');localStorage.removeItem('insyt-corp-theme');}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#F7F8FC" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} ${volteBangla.variable} min-h-screen font-sans antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
