import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/components/theme-provider";
import { Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cairo = Cairo({
  subsets: ["arabic"], // IMPORTANT
  weight: ["300", "400", "500", "600", "700", "800", "900"], // choose what you need
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "سند | مدرس خصوصي بالذكاء الاصطناعي",
    template: "%s | سند",
  },
  description:
    "منصة تعليمية ذكية مدعومة بالذكاء الاصطناعي تقدم تجربة تعلم شخصية وتفاعلية",
  icons: {
    icon: [
      {
        url: "/static/sanad-logo-primary.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/static/sanad-logo-primary.png",
      },
    ],
  },
  openGraph: {
    title: "سند | مدرس خصوصي بالذكاء الاصطناعي",
    description:
      "منصة تعليمية ذكية مدعومة بالذكاء الاصطناعي تقدم تجربة تعلم شخصية وتفاعلية",
    type: "website",
    locale: "ar_SA",
    siteName: "سند - Chapter 14",
  },
  twitter: {
    card: "summary_large_image",
    title: "سند | مدرس خصوصي بالذكاء الاصطناعي",
    description:
      "منصة تعليمية ذكية مدعومة بالذكاء الاصطناعي تقدم تجربة تعلم شخصية وتفاعلية",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning dir="rtl">
      <body className={`${cairo.variable} ${cairo.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <DirectionProvider dir="rtl">{children}</DirectionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
