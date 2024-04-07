import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import ModeToggle from "@/components/toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title : {
    default : "Home",
    template: "%s | Zuber "
  },
  icons: [
    {
      url : "/zuber_icon.png"
    }
  ],
  description: "Zuber Web", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
          >
            <div className="m-4"><ModeToggle/></div>
            <Toaster/>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
