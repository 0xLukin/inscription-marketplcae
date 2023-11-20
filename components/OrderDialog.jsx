import React from "react"
import { useForm } from "react-hook-form"

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
import { Loader2 } from "lucide-react"

const OrderDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>PUBLISH SELL ORDER</Button>
      </DialogTrigger>
      <DialogContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Publish Sell Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="tick">Tick</Label>
            <Input {...register("tick", { required: "Tick is required" })} />
            {errors.tick && <p>{errors.tick.message}</p>}
          </div>
          <div>
            <Label htmlFor="tickAmount">Tick Amount</Label>
            <Input
              {...register("tickAmount", {
                required: "Tick Amount is required"
              })}
            />
            {errors.tickAmount && <p>{errors.tickAmount.message}</p>}
          </div>
          <div>
            <Label htmlFor="askAmount">Ask Amount</Label>
            <Input
              {...register("askAmount", { required: "Ask Amount is required" })}
            />
            {errors.askAmount && <p>{errors.askAmount.message}</p>}
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDialog
