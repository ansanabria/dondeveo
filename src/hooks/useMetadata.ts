import { MetadataContext, MetadataContextProps } from "@/context"
import { useContext } from "react"

export function useMetadata() {
  const context = useContext(MetadataContext)

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }

  return context as MetadataContextProps
}
