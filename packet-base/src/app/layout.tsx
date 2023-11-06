import { Inter } from "next/font/google";
import "./globals.css";
import VerticalMenu from "@/components/VerticalMenu/VertircalMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex h-full">
          <VerticalMenu />
          <div className="flex-1 w-64">{children}</div>
        </div>
      </body>
    </html>
  );
}
