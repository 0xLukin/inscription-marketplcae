import React, { useState } from "react"
import Image from "next/image"

import { Loader2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const OrderCard = () => {
  const [loading, setLoading] = useState(true)

  return (
    <Card className="relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <Loader2 className="text-white animate-spin h-8 w-8" />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="flex flex-row items-center gap-2">
            <div>
              <Image
                src="/polygon_logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>

            <div>ETH #2,562,055</div>
          </CardTitle>
          <div>$单价0.0002</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div>
            <div>总价</div>
            <div>0.002($7160)</div>
          </div>
          <div>
            <Button>购买</Button>
            {/* <Button>撤单</Button> */}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <div>avator</div>
          <div>0x1a43....bbc5e3d9</div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
