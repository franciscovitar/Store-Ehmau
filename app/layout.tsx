import { Roboto } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import RenderNav from "../components/rendervab";
import Footer from "@/components/footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-tooltip/dist/react-tooltip.css";

import "./globals.css";
import Contacto from "@/components/Contacto";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Tienda Online",
  description: "E-commerce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <RenderNav />
        {children}
        <Contacto />
        <Footer />
      </body>
    </html>
  );
}
