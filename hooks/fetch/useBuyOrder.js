import { useState } from "react"

function useBuyOrder() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const buyOrder = async (orderId, buyerAddress) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/buyOrders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerAddress })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setResponse(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { buyOrder, response, loading, error }
}

export default useBuyOrder
