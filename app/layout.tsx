import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Pet Pals — Your Virtual Pet Shop",
  description:
    "Feed, play with, and care for your adorable pets in Pet Pals! A fun virtual pet game for kids aged 6 to 10.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={nunito.variable}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-nunito antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <LanguageToggle />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}