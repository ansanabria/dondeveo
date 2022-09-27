// Styling types
export interface StylingProps {
  className?: string
}

// Types info
export type FormatType = "movie" | "tv"
export type FormatOptionsType = Record<FormatType, string>

type FlatrateKeys = "logo_path" | "provider_id" | "provider_name"
export type FlatrateType = Record<FlatrateKeys, string>

export type QueryProps = {
  name: string
}

type CountryKeys =
  | "AR"
  | "AT"
  | "AU"
  | "BE"
  | "BR"
  | "CA"
  | "CH"
  | "CL"
  | "CO"
  | "CZ"
  | "DE"
  | "DK"
  | "EC"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HU"
  | "ID"
  | "IE"
  | "IN"
  | "IT"
  | "JP"
  | "KR"
  | "LT"
  | "LV"
  | "MX"
  | "MY"
  | "NL"
  | "NO"
  | "NZ"
  | "PE"
  | "PH"
  | "PL"
  | "PT"
  | "RO"
  | "RU"
  | "SE"
  | "SG"
  | "TH"
  | "TR"
  | "US"
  | "VE"
  | "ZA"

// Types for multi-search API request
type BaseResType = {
  id: number
  media_type: string
  poster_path: string | null
  overview: string
}

type TempTvType = Record<"first_air_date" | "name", string> & BaseResType
type TempMovieType = Record<"release_date" | "title", string> & BaseResType
export type TempContentType = TempMovieType | TempTvType
export type TempResType = { page: number; results: TempContentType[] }

type TvType = Omit<TempTvType, "media_type"> & { media_type: FormatType }
type MovieType = Omit<TempMovieType, "media_type"> & { media_type: FormatType }
export type ContentType = MovieType | TvType

// Types for API request to streaming services
type CountryDataType = {
  link: string
  flatrate: FlatrateType[]
}
type StreamResType = Partial<Record<CountryKeys, CountryDataType>>
export type StreamDataType = { id: number; results: StreamResType }

// Types for combining search results with stream providers
export type StreamTvType = TvType & { providers: FlatrateType[] }
export type StreamMovieType = MovieType & { providers: FlatrateType[] }
export type StreamContentType = StreamMovieType | StreamTvType

// Type for getting image configuration data
export type ImagesConfigType = {
  images: {
    secure_base_url: string
    logo_sizes: string[]
    poster_sizes: string[]
  }
}

// Base search props
interface BaseSearchProps {
  baseUrl: string
  posterSize: string
}

// Search page props

export interface SearchProps extends BaseSearchProps {
  filteredData: StreamContentType[]
}

// Search item component props
export interface SearchItemProps extends BaseSearchProps {
  item: StreamContentType
}
