import { ConnectButton } from "@rainbow-me/rainbowkit"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Button } from "@/components/ui/button"
import OrderCard from "@/components/OrderCard"

const Home = () => {
  return (
    <div className="flex flex-row gap-8 mx-10 pt-10">
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  )
}

export default Home
