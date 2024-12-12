// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider"; // Import ClientProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TerminalCode",
  description: "Created to Code Fast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap your app with the ClientProvider that includes the Redux Provider */}
        
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
