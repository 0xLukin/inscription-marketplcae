import React, { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import useCreateOrUpdateOrder from "@/hooks/fetch/useCreateOrUpdateOrder"

const OrderDialog = () => {
  const [tick, setTick] = useState("pols")
  const [tickAmount, setTickAmount] = useState("")
  const [askAmount, setAskAmount] = useState("")
  const tickAmountRef = useRef()
  const askAmountRef = useRef()

  const { createOrUpdateOrder, response, loading, error } =
    useCreateOrUpdateOrder()

  const onSubmit = async (data) => {
    console.log(tick, "tick")
    console.log(tickAmountRef.current.value, "tickAmount")
    console.log(askAmountRef.current.value, "askAmount")
    const orderData = {
      userAddress: "0x123",
      networkId: 1,
      tick: tick,
      tickAmount: tickAmountRef.current.value,
      askAmount: askAmountRef.current.value
    }
    console.log(orderData, "orderData")
    await createOrUpdateOrder(orderData)
    console.log(response)
    console.log(error)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>PUBLISH SELL ORDER</Button>
      </DialogTrigger>
      <DialogContent as="form" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Publish Sell Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="tick">Tick</Label>
            <Select value={tick} onChange={(e) => setTick(e.target.value)}>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pols">POLS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tickAmount">Tick Amount</Label>
            <Input
              ref={tickAmountRef}
              value={tickAmount}
              onChange={(e) => setTickAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="askAmount">Ask Amount</Label>
            <Input
              ref={askAmountRef}
              value={askAmount}
              onChange={(e) => setAskAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} type="submit">
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDialog
