import { CustomHead } from "@/components"
import { MetadataProvider } from "@/context/MetadataContext"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetadataProvider>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎥</text></svg>"
        />
      </Head>
      <CustomHead
        title="DóndeVeo"
        description="Conoce en cuál plataforma de streaming está la película o serie que quieres ver."
        og={{
          description:
            "Conoce en cuál plataforma de streaming está lo que quieres ver.",
        }}
      />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <Component {...pageProps} />
    </MetadataProvider>
  )
}
