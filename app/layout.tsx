import { LightProvider } from "@/lib/light-context";
import LightTestButton from "@/components/LightTestButton";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sooner",
  description: "Sooner Studios",
};

const lightScript = `try {
  var saved = localStorage.getItem("sooner-light");
  document.documentElement.dataset.light = saved === "on" ? "on" : "off";
} catch {}`;


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: lightScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LightProvider>
          <Header />
          {children}
          <LightTestButton />
        </LightProvider>
      </body>

    </html>
  );
}
