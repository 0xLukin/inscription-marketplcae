import React, { useState, useCallback } from "react"
import InscCard from "./InscCard"

function InscCardList({ inscCards }) {
  const [selected, setSelected] = useState({})

  const handleToggle = useCallback((mintHash) => {
    setSelected((prev) => ({ ...prev, [mintHash]: !prev[mintHash] }))
  }, [])

  const isSelected = Object.values(selected).some((value) => value)

  return (
    <div className="grid grid-cols-3 gap-8 mx-10">
      {inscCards.map((card) => (
        <InscCard
          key={card.mintHash}
          isChecked={selected[card.mintHash]}
          onToggle={() => handleToggle(card.mintHash)}
          data={card}
        />
      ))}
      {isSelected && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            结算
          </button>
        </div>
      )}
    </div>
  )
}

export default InscCardList
