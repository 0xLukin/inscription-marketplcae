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

const OrderCard = ({
  id,
  status,
  userAddress,
  networkId,
  tick,
  tickAmount,
  askAmount
}) => {
  const [loading, setLoading] = useState(true)

  const handlePurchaseClick = (orderId) => {
    console.log("Purchasing order with id:", orderId)
  }

  return (
    <Card className="relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="text-white">交易进行中</div>
          <Loader2 className="text-white animate-spin h-8 w-8" />
        </div>
      )}
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="flex flex-row items-center gap-2">
            <div>
              {networkId}
              <Image
                src="/polygon_logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
            <div>
              {tick} - {tickAmount}
            </div>
          </CardTitle>
          <div>{askAmount}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div>
            <div>总价</div>
            <div>${askAmount ? askAmount : 0}</div>
          </div>
          <div>
            <Button onClick={() => handlePurchaseClick(id)}>购买</Button>
            {/* <Button>撤单</Button> */}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <div>{userAddress}</div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
