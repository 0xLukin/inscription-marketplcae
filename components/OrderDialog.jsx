import React, { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const OrderDialog = () => {
  const [tick, setTick] = useState("")
  const [tickAmount, setTickAmount] = useState("")
  const [askAmount, setAskAmount] = useState("")
  const tickRef = useRef()
  const tickAmountRef = useRef()
  const askAmountRef = useRef()

  const onSubmit = (data) => {
    console.log(tickRef.current.value, "tick")
    console.log(tickAmountRef.current.value, "tickAmount")
    console.log(askAmountRef.current.value, "askAmount")
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
            <Input
              ref={tickRef}
              value={tick}
              onChange={(e) => setTick(e.target.value)}
            />
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
          <Button variant="outline">Cancel</Button>
          <Button onClick={onSubmit} type="submit">
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDialog
