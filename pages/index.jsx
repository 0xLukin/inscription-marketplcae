import OrderCard from "@/components/OrderCard"
import OrderDialog from "@/components/OrderDialog"
import { Button } from "@/components/ui/button"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import Screen from "@/components/Screen"
import Search from "@/components/Search"

const Home = () => {
  const { error } = useCheckNetwork()
  return (
    <div className="px-8 mt-10">
      <div className="flex flex-row justify-between mx-10 mb-10">
        <div className="font-bold text-3xl">Explore Inscriptions</div>
        <OrderDialog />
      </div>
      <div
        title="screen"
        className="flex items-center justify-between mx-10 py-10"
      >
        <Screen />

        <Search />
      </div>
      <div className="grid grid-cols-3 gap-8 mx-10">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  )
}

export default Home
