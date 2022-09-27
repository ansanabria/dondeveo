import {
  ContentType,
  FlatrateType,
  FormatOptionsType,
  FormatType,
  ImagesConfigType,
  StreamContentType,
  StreamDataType,
  TempResType,
} from "@/types"

export const formatOptions: FormatOptionsType = {
  movie: "Movie",
  tv: "TV Show",
}

export const isValid = (date: Date) => {
  if (date.getTime() === date.getTime()) {
    return true
  }
  return false
}

export const getSearchResults = async (apiKey: string, query: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
  )
  const keys = Object.keys(formatOptions)
  const { page, results }: TempResType = await response.json()

  const data = results.filter(({ media_type }) =>
    keys.includes(media_type)
  ) as ContentType[]

  return { page, data }
}

export const getImagesConfig = async (apiKey: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`
  )
  const { images }: ImagesConfigType = await response.json()

  const baseUrl = images.secure_base_url
  const posterSize = images.poster_sizes.at(-2) as string

  return { baseUrl, posterSize }
}

const getItemServices = async (item: ContentType, apiKey: string) => {
  let mediaType: FormatType
  if (item.media_type === "movie") {
    mediaType = "movie"
  } else {
    mediaType = "tv"
  }

  const apiCall = `https://api.themoviedb.org/3/${mediaType}/${item.id}/watch/providers?api_key=${apiKey}`

  const streamingResponse = await fetch(apiCall)
  const streamingData: StreamDataType = await streamingResponse.json()
  return streamingData
}

const createDataSchema = (streamingData: StreamDataType, item: ContentType) => {
  const results = streamingData.results
  const resultsKeys = Object.keys(results)
  const resultsLength = resultsKeys.length
  let providers: FlatrateType[] = []
  if (resultsLength && resultsKeys.includes("CO") && results.CO?.flatrate) {
    providers = results.CO.flatrate
  }
  return { ...item, providers } as StreamContentType
}

export const getStreamingServices = async (
  data: ContentType[],
  apiKey: string
) => {
  const dataWithStreaming = await Promise.all(
    data.map(async (item) => {
      const streamingData = await getItemServices(item, apiKey)
      const dataSchema = createDataSchema(streamingData, item)
      return dataSchema
    })
  )

  const filteredData = dataWithStreaming.filter((item) => {
    const providerLength = item.providers.length
    if (providerLength) {
      return true
    }
    return false
  })

  return filteredData
}
