import { SearchBar } from "@/components"

export default function HomePage() {
  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center  space-y-8 px-4 pb-28">
      <div className="space-y-2">
        <h1 className="text-4xl font-black md:text-5xl">StreamFinder</h1>
        <p className="text-center text-sm md:text-base">Powered by JustWatch</p>
      </div>
      <SearchBar />
    </div>
  )
}
