import { Geist, Geist_Mono } from "next/font/google";
import { inter } from "@/app/components/ui/fonts";
import { NotificationProvider } from "@/app/contexts/NotificationContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portal de Empleo",
  description: "Mentory Grupo Consultor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-ES">
      <body className={`${inter.className} antialiased`}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
