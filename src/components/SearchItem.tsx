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
    <div className="flex items-center gap-x-10 rounded-xl bg-gray-700 p-6">
      <div className="relative aspect-[94/141] w-1/6 overflow-hidden rounded-md bg-gray-300">
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
      <div className="w-5/6">
        <div className="mb-1 flex items-center gap-x-5">
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
          <div className="text-sm font-light">
            {date.toDateString().slice(3)}
          </div>
        )}
        <p className="mt-3 line-clamp-3">{item.overview}</p>
        <div className="mt-3 flex flex-wrap gap-x-3 font-bold ">
          {item.providers.map((prov) => {
            return (
              <div
                className="w-fit rounded-md bg-rose-900 py-1 px-2"
                key={uuidv4()}
              >
                {prov.provider_name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
