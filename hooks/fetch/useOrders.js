import { useState, useEffect } from "react"

function useOrders(queryParams = "") {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/orders${queryParams}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [queryParams])

  return { orders, loading, error }
}

export default useOrders
