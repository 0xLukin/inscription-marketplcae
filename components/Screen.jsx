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
        <Select defaultValue="pols">
          <SelectTrigger className="w-[180px] h-14 ">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pols">POLS</SelectItem>
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
