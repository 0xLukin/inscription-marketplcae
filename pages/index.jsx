import OrderCard from "@/components/OrderCard"
import OrderDialog from "@/components/OrderDialog"
import { Button } from "@/components/ui/button"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import Screen from "@/components/Screen"
import Search from "@/components/Search"
import useGetOrders from "@/hooks/fetch/useGetOrders"
import MyInsc from "@/components/MyInsc"

const Home = () => {
  const { error } = useCheckNetwork()

  const { data, loading, error: gerOrderError } = useGetOrders()
  console.log(data)
  // if (loading) return <div>Loading...</div>
  // if (gerOrderError) return <div>Error: {gerOrderError.message}</div>

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
        <div className=" hidden">
          <Search />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mx-10">
        {data?.map((order, index) => (
          <OrderCard
            key={index}
            id={order.id}
            status={order?.buyerAddress ? true : false}
            userAddress={order.userAddress}
            networkId={order.networkId}
            tick={order.tick}
            tickAmount={order.tickAmount}
            askAmount={order.askAmount}
          />
        ))}
      </div>

      <MyInsc />
    </div>
  )
}

export default Home
