import { MetadataProvider } from "@/context/MetadataContext"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetadataProvider>
      <Component {...pageProps} />
    </MetadataProvider>
  )
}
