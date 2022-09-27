import { createContext, Dispatch, SetStateAction, useState } from "react"

export interface MetadataContextProps {
  tmdbId: {
    tmdbId: string
    setTmdbId: Dispatch<SetStateAction<string>>
  }
  country: {
    country: string
    setCountry: Dispatch<SetStateAction<string>>
  }
  format: {
    format: string
    setFormat: Dispatch<SetStateAction<string>>
  }
}

export const MetadataContext = createContext<MetadataContextProps | null>(null)

export function MetadataProvider({ children }: any) {
  const [tmdbId, setTmdbId] = useState("")
  const [country, setCountry] = useState("")
  const [format, setFormat] = useState("")

  const value = {
    tmdbId: { tmdbId, setTmdbId },
    country: { country, setCountry },
    format: { format, setFormat },
  }

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  )
}
