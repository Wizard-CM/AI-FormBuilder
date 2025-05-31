import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "@/context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build Forms",
  description: "Build Forms using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <AuthWrapper>
            <Toaster
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            {children}
          </AuthWrapper>
        </ContextProvider>
      </body>
    </html>
  );
}
