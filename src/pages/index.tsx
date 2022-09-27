import { SearchBar } from "@/components"

export default function HomePage() {
  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-y-10 pb-32">
      <h1 className="text-5xl font-black">StreamFinder</h1>
      <SearchBar />
    </div>
  )
}
