//Meroidea/frontend/src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider"; // Adjust path if needed

export const metadata: Metadata = {
  title: "Meroidea | Admin Dashboard",
  description: "Secure multi-user SaaS platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}