import NextHead from "next/head"
import { useRouter } from "next/router"

const BASE_URL = "https://dondeveo.co"
// DEEPEN
// https://stackoverflow.com/questions/61574405/how-to-access-canonical-url-in-next-js-with-automatic-static-optimization-turned

interface CustomHeadProps {
  title: string
  description: string //  Important to use keywords.
  og: {
    title?: string
    type?: string
    description?: string
  }
}

export const CustomHead = ({ title, og, description }: CustomHeadProps) => {
  const canonicalURL = BASE_URL + useRouter().asPath
  // Checks
  console.assert(title.length <= 65, "Head <title> too long.")
  console.assert(description.length <= 155, "Head description too long.")
  console.assert(
    og.title ? og.title.length <= 35 : title.length <= 35,
    "og:title too long"
  )
  console.assert(
    og.description ? og.description.length <= 65 : description.length <= 65,
    "og:description too long"
  )

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* og - required*/}
      <meta property="og:title" content={og.title ?? title} />
      <meta property="og:type" content={og.type ?? "website"} />
      <meta property="og:url" content={canonicalURL} />
      {/* og - optional */}
      <meta property="og:description" content={og.description ?? description} />
      {/* <meta
        key="image"
        property="image"
        content=""
      />
      <meta property="og:image:width" content="1200" />

      <meta property="og:image:height" content="600" /> */}
    </NextHead>
  )
}
