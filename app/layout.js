import Header from "./Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "clean ticket",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center self-center font-notoSans pb-14">
        <Header />
        <div className="border-b-2 border-gray-200 w-full"></div>
        {children}
      </body>
    </html>
  );
}
