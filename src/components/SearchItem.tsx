import { SearchItemProps, StreamMovieType, StreamTvType } from "@/types"
import { formatOptions, isValid } from "@/utils"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import { BsImageFill as ImageFillIcon } from "react-icons/bs"

export const SearchItem = ({ item, baseUrl, posterSize }: SearchItemProps) => {
  const imageSrc = `${baseUrl}${posterSize}${item.poster_path}`
  let heading: string
  let date: Date

  if (item.media_type === "movie") {
    const fullItem = item as StreamMovieType
    heading = fullItem.title
    date = new Date(fullItem.release_date)
  } else {
    const fullItem = item as StreamTvType
    heading = fullItem.name
    date = new Date(fullItem.first_air_date)
  }
  return (
    <div className=" mx-auto flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl bg-gray-700 p-6 md:max-w-none md:flex-row md:space-x-10 md:space-y-0">
      <div className="relative aspect-[94/141] w-1/2 overflow-hidden rounded-md bg-gray-300 md:w-1/6">
        {!item.poster_path ? (
          <div className="h-full w-full bg-gray-200">
            <ImageFillIcon size={50} className="mx-auto h-full fill-black/50" />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={`Image - ${heading}`}
            layout="fill"
            unoptimized
          />
        )}
      </div>
      <div className="w-full max-w-xs md:w-5/6 md:max-w-none">
        <div className="flex flex-col items-center space-y-2 text-center md:flex-row md:space-x-5 md:space-y-0 md:text-left">
          <h2 className="text-xl font-bold">{heading}</h2>
          <div
            className={`w-full max-w-max rounded-md p-1 text-xs font-black ${
              item.media_type === "movie" ? "bg-green-700" : "bg-orange-700"
            }`}
          >
            {formatOptions[item.media_type]}
          </div>
        </div>
        {isValid(date) && (
          <div className="mt-3 text-center text-sm font-light capitalize md:text-left">
            {date.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
            })}
          </div>
        )}
        <p className="mt-3 text-sm line-clamp-3 md:text-base">
          {item.overview}
        </p>
        <div className="mt-4 flex flex-wrap justify-center font-bold md:justify-start ">
          {item.providers.length ? (
            item.providers.map((prov) => {
              return (
                <div
                  className="mb-2 mr-2 w-fit rounded-md bg-rose-900 py-1 px-2 last:mr-0"
                  key={uuidv4()}
                >
                  {prov.provider_name}
                </div>
              )
            })
          ) : (
            <div
              className="w-fit rounded-md bg-rose-900 py-1 px-2"
              key={uuidv4()}
            >
              No disponible en tu país
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
