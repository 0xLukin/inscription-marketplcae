import OrderCard from "@/components/OrderCard"
import useCheckNetwork from "@/hooks/useCheckNetwork"
import Screen from "@/components/Screen"
import Search from "@/components/Search"

const Home = () => {
  const { error } = useCheckNetwork()
  return (
    <div>
      <div
        title="screen"
        className=" flex items-center justify-between mx-10 pt-10"
      >
        <Screen />

        <Search />
      </div>
      <div className="flex flex-row gap-8 mx-10 pt-10 ">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  )
}

export default Home
