import React from "react"

const InscCard = React.memo(({ isChecked, onToggle, data }) => {
  return (
    <div
      className={`relative border-2 p-4 hover:cursor-pointer ${
        isChecked ? "border-blue-500" : "border-gray-300"
      }`}
      onClick={onToggle}
    >
      {isChecked && <div className="absolute top-2 right-2">✔️</div>}
      <div className="mb-2">{data.content}</div>
      <div className="text-sm text-gray-600">
        <div>Network ID: {data.networkId}</div>
        <div>Ticker: {data.tick}</div>
        <div>Amount: {data.amount}</div>
        <div>Mint Hash: {data.mintHash}</div>
      </div>
    </div>
  )
})

export default InscCard
