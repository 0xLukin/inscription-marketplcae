import { useState, useEffect } from "react"

function useIncompleteOrders(userAddress) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/incompleteOrders/${userAddress}`
        const response = await fetch(url)
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
