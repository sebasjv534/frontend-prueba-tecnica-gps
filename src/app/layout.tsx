import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "@/hooks";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gestión de Vehículos",
  description: "Sistema de gestión de vehículos - Prueba Técnica Frontend",
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://sebasjv534.github.io/frontend-prueba-tecnica-gps'
      : 'http://localhost:3000'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} antialiased font-montserrat`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
