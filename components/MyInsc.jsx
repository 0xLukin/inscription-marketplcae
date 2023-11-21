import React, { useEffect, useState } from "react"
import InscCardList from "./InscCardList"

export default function MyInsc() {
  const [inscCards, setInscCards] = useState([])
  useEffect(() => {
    setInscCards([
      {
        networkId: 1,
        tick: "pols",
        amount: "1000",
        mintHash: "mintHash",
        content: "Card 1"
      },
      {
        networkId: 1,
        tick: "pols",
        amount: "1000",
        mintHash: "mintHash1",
        content: "Card 1"
      }
      // ... 更多卡片数据
    ])
  }, [])
  console.log(inscCards)
  return (
    <div className=" mt-10">
      <InscCardList inscCards={inscCards} />
    </div>
  )
}
