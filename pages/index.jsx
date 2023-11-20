import OrderCard from "@/components/OrderCard"
import OrderDialog from "@/components/OrderDialog"
import { Button } from "@/components/ui/button"
import useCheckNetwork from "@/hooks/useCheckNetwork"

const Home = () => {
  const { error } = useCheckNetwork()
  return (
    <div className="px-8 mt-10">
      <div className="flex flex-row justify-between mb-10">
        <div className="font-bold text-3xl">Explore Inscriptions</div>
        <OrderDialog />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  )
}

export default Home
