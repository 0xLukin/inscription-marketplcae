import { useState, useEffect } from "react"
import { useApiClient } from "../apiClient"

function useIncompleteOrders(userAddress) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { apiClient } = useApiClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/incompleteOrders/${userAddress}`
        const response = await apiClient(url)
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

    if (userAddress) {
      fetchData()
    }
  }, [userAddress])

  return { data, loading, error }
}

export default useIncompleteOrders
