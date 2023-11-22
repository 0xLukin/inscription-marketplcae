import { useState } from "react"
import { useApiClient } from "../apiClient"

function useDeleteOrder() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { apiClient } = useApiClient()

  const deleteOrder = async (orderId, deleteAddress) => {
    setLoading(true)
    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_HOST}/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deleteAddress })
        }
      )

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

  return { deleteOrder, response, loading, error }
}

export default useDeleteOrder
