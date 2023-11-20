import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export default function Screen() {
  return (
    <div className="flex items-center gap-4">
      <section title="fileType">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] h-14 ">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="image" disabled={true}>
              Image
            </SelectItem>
            <SelectItem value="gifs" disabled={true}>
              GIFs
            </SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>
      </section>
      <section title="network">
        <Select defaultValue="polygon">
          <SelectTrigger className="w-[180px] h-14 ">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="eth" disabled={true}>
              Ethereum
            </SelectItem>
            <SelectItem value="bsc" disabled={true}>
              BNB Smart Chain
            </SelectItem>
          </SelectContent>
        </Select>
      </section>
    </div>
  )
}
