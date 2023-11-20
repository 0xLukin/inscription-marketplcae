import OrderCard from "@/components/OrderCard"
import useCheckNetwork from "@/hooks/useCheckNetwork"

const Home = () => {
  const { error } = useCheckNetwork()
  return (
    <div className="grid grid-cols-3 gap-8 mx-10 pt-100">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  )
}

export default Home
