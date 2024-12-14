import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/Shared/navbar";
import Footer from "@/components/Shared/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark", enableSystem: true }}>
          {/* <LanguageProvider></LanguageProvider> */}
          <div className="">
            <div className="relative flex flex-col bg-gradient-light dark:bg-gradient-dark">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <div className="mt-32 ">
                <Footer />
              </div>

            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}


//light:bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500
//dark:bg-gradient-to-tr from-sky-950 via-indigo-950 to-purple-950

//bg-gradient-light dark:bg-gradient-dark