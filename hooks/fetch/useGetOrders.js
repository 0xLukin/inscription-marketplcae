import { useState, useEffect } from "react"
import { useApiClient } from "../apiClient"

function useGetOrders(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { apiClient } = useApiClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient(`/api/orders`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useGetOrders
