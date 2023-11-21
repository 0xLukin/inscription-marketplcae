import { useState } from "react"
import { useSendTransaction, useWaitForTransaction } from "wagmi"

function useUserTransfer() {
  const [transactionHash, setTransactionHash] = useState(null)
  const [error, setError] = useState(null)

  const { sendTransactionAsync } = useSendTransaction({
    onSettled(data, error) {
      if (error) {
        setError(error)
      } else {
        setTransactionHash(data.hash)
      }
    }
  })

  const { data: transactionData, isLoading } = useWaitForTransaction({
    hash: transactionHash
  })

  const transfer = async (to, mintHashes) => {
    try {
      const firstHash = mintHashes[0]
      const otherHashes = mintHashes
        .slice(1)
        .map((hash) => hash.slice(2))
        .join("")
      const data = `${firstHash}${otherHashes}`
      console.log(data, "data")
      await sendTransactionAsync({
        to: to,
        value: 0, // 0 ETH
        data: data
      })
    } catch (error) {
      setError(error)
    }
  }

  return { transfer, transactionData, isLoading, error }
}

export default useUserTransfer
