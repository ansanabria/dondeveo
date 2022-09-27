import { SearchBar, SearchItem } from "@/components"
import { QueryProps, SearchProps } from "@/types"
import {
  getImagesConfig,
  getSearchResults,
  getStreamingServices,
} from "@/utils"
import { GetServerSideProps } from "next"
import { v4 as uuidv4 } from "uuid"

const Search = ({ filteredData, baseUrl, posterSize }: SearchProps) => {
  return (
    <div className="mx-auto my-10 flex max-w-3xl flex-col gap-y-10">
      <SearchBar className="mx-auto max-w-xl" />
      <div className="flex flex-col gap-y-5">
        {filteredData.map((item) => (
          <SearchItem
            key={uuidv4()}
            item={item}
            baseUrl={baseUrl}
            posterSize={posterSize}
          />
        ))}
      </div>
    </div>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiKey = process.env.API_KEY as string

  // Parse router query
  const query = JSON.parse(JSON.stringify(context.query)) as QueryProps

  // Call API and transform data
  const { baseUrl, posterSize } = await getImagesConfig(apiKey)
  const { data } = await getSearchResults(apiKey, query.name)

  const filteredData = await getStreamingServices(data, apiKey)

  return {
    props: {
      baseUrl,
      posterSize,
      filteredData,
    },
  }
}
