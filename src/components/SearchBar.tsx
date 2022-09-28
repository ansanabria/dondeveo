import { StylingProps } from "@/types"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { BsSearch } from "react-icons/bs"

export const SearchBar = ({ className }: StylingProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery) {
      router.push({
        pathname: "/search",
        query: { name: searchQuery },
      })
    }
  }

  return (
    <form className={`flex w-full gap-x-4 ${className}`} onSubmit={onSubmit}>
      <div className="flex h-12 w-full grow items-center overflow-hidden rounded-xl bg-gray-700 hover:drop-shadow-2xl">
        <input
          className="h-full w-full grow bg-inherit px-4 text-sm outline-none"
          placeholder="Search your movie or TV show..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="group flex h-full items-center justify-center px-4 transition-all hover:bg-gradient-to-br hover:from-rose-700 hover:via-purple-700 hover:to-blue-600"
        >
          <BsSearch className="fill-rose-600 group-hover:fill-white" />
        </button>
      </div>
    </form>
  )
}
