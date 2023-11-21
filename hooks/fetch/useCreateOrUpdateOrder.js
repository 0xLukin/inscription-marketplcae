import { useState, useCallback } from "react"
import { useApiClient } from "../apiClient"

function useCreateOrUpdateOrder() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { apiClient } = useApiClient()

  const createOrUpdateOrder = useCallback(
    async (orderData) => {
      setLoading(true)
      try {
        const response = await apiClient("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData)
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
    },
    [apiClient]
  )

  return { createOrUpdateOrder, response, loading, error }
}

export default useCreateOrUpdateOrder
