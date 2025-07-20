import {Geist, Geist_Mono, Montserrat} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";
import MultiModal from "@/components/MultiModal/MultiModal";
import Overlay from "@/components/Overlay/Overlay";
import WhatsAppBtn from "@/components/WhatsAppBtn/WhatsAppBtn";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'], // для поддержки кириллицы
  weight: ['400', '500', '600', '700'], // нужные веса
  display: 'swap',
});

export const metadata = {
  title: "ALLSTROY - Мы строим доверие, не просто стены",
  description: "ALLSTROY — профессиональный ремонт квартир и домов под ключ в Алматы и области. Мы строим доверие, а не просто стены.",
  keywords: [
    "ремонт под ключ Алматы",
    "ремонт квартир",
    "отделка домов",
    "дизайн интерьера",
    "ALLSTROY",
    "строительная компания Алматы"
  ],
  authors: [{ name: "ALLSTROY", url: "https://allstroy.kz" }],
  creator: "ALLSTROY",
  publisher: "ALLSTROY",
  openGraph: {
    title: "ALLSTROY - Мы строим доверие, не просто стены",
    description: "Ремонт под ключ квартир и домов в Алматы и Алматинской области. Гарантия качества. Индивидуальный подход.",
    url: "https://allstroy.kz",
    siteName: "ALLSTROY",
    images: [
      {
        url: "/img/logo.png",
        width: 800,
        height: 600,
        alt: "ALLSTROY логотип",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  icons: {
    icon: "/img/logo.png", // favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
      className={`${montserrat.className} antialiased`}
    >
    <Providers>
      <Header/>
      <MultiModal/>
      <Overlay/>
      <Toaster position="top-center" reverseOrder={false}/>
      {children}
      <WhatsAppBtn/>
      <Footer/>
    </Providers>
    </body>
    </html>
  );
}
