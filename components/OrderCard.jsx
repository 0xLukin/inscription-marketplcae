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
import useBuyOrder from "@/hooks/fetch/useBuyOrder"
import useDeleteOrder from "@/hooks/fetch/useDeleteOrder"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"

import { formatUnits } from "ethers/lib/utils"

const OrderCard = ({
  id,
  status,
  userAddress,
  networkId,
  tick,
  tickAmount,
  askAmount
}) => {
  const { address } = useAccount()

  const { buyOrder, response, loading: buyingLoading, error } = useBuyOrder()

  const { deleteOrder } = useDeleteOrder()

  const { toast } = useToast()

  const handlePurchaseClick = async (orderId) => {
    console.log("Purchasing order with id:", orderId)
    await buyOrder(orderId, address)

    if (response.ok) {
      toast({
        title: "Success",
        description: "Buy Success"
      })
    } else {
      toast({
        title: "Error",
        description: "Buy Failed"
      })
    }
  }

  const formatAddress = (address) => {
    if (address.length > 8) {
      return address.slice(0, 4) + "...." + address.slice(-4)
    }
    return address
  }

  return (
    <Card className="relative">
      {status && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="text-white">交易进行中</div>
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
            <div>
              {tick} - {tickAmount}
            </div>
          </CardTitle>
          {/* askAmount / tickamount */}
          <div>
            {askAmount ? formatUnits(askAmount, "ether") : "0.00"} Matic / Pols
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div>
            <div>总价</div>
            {/* todo askAmount transfer 000000000 18 */}
            <div className="flex flex-col">
              <div className="font-bold">${askAmount ? askAmount : 0} USD</div>
              {/* dex tool */}
              <div>
                {askAmount
                  ? formatUnits(askAmount * tickAmount, "ether")
                  : "0.00"}{" "}
                Matic
              </div>
            </div>
          </div>
          <div>
            {!status && userAddress === address ? (
              <Button>撤单</Button>
            ) : (
              <Button
                onClick={() => handlePurchaseClick(id)}
                disabled={buyingLoading}
              >
                购买
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <div>Address:</div>
          <div>{userAddress ? formatAddress(userAddress) : ""}</div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
