import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Search() {
  return (
    <div className="flex w-full max-w-sm items-center relative">
      <Input
        type="text"
        placeholder="Search ID #"
        className="pl-3 pr-16 py-4 h-14 "
      />
      <Button type="submit" className="absolute right-3">
        Subscribe
      </Button>
    </div>
  )
}
