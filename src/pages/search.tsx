import { SearchBar, SearchItem } from "@/components"
import { QueryProps, SearchProps } from "@/types"
import {
  getImagesConfig,
  getSearchResults,
  getStreamingServices,
} from "@/utils"
import { GetServerSideProps } from "next"
import { BiSad as SadIcon } from "react-icons/bi"
import { v4 as uuidv4 } from "uuid"

const Search = ({ filteredData, baseUrl, posterSize }: SearchProps) => {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl flex-col space-y-10 px-4">
      <SearchBar className="mx-auto max-w-xl" />
      <div className="flex flex-col space-y-5">
        {filteredData.length ? (
          filteredData.map((item) => (
            <SearchItem
              key={uuidv4()}
              item={item}
              baseUrl={baseUrl}
              posterSize={posterSize}
            />
          ))
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <SadIcon size={50} />
            <p className="text-lg">
              Lo sentimos, no encontramos lo que estás buscando.
            </p>
          </div>
        )}
      </div>
      <footer className="text-light border-t border-t-white/20 py-5 text-center text-xs font-light">
        Powered by JustWatch
      </footer>
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
