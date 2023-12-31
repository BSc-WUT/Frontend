import "./globals.css";
import Providers from "@/providers/providers";
import Layout from "@/components/Layout/Layout";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={` h-full`}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <Layout>{children}</Layout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
