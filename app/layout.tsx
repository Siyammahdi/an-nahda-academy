"use client"
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/Shared/navbar";
import Footer from "@/components/Shared/footer";
import { metadata } from "@/utils/MetaData/Metadata";
import { usePathname } from "next/navigation";


// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname()
  const detailPage = location.includes('/course_details')
  const noHeaderFooter = location.includes('/dashboard')
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
              {noHeaderFooter || <Navbar />}

              <main className={clsx(
                "container mx-auto pt-10 px-6 flex-grow",
                detailPage ? "max-w-full" : "max-w-7xl", noHeaderFooter && 'max-w-full pt-0 px-0'
              )}>
                {children}
              </main>

              <div className="bg-gradient-to-r from-purple-950 via-sky-950 to-indigo-950 ">
                {noHeaderFooter || <Footer/>}
              </div>

            </div>
          </div>
        </Providers>
      </body>
    </html >
  );
}


//light:bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500
//dark:bg-gradient-to-tr from-sky-950 via-indigo-950 to-purple-950

//bg-gradient-light dark:bg-gradient-dark