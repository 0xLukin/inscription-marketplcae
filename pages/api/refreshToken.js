export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required." })
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/refresh-tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Unknown error occurred.")
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error in refreshToken:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to refresh token.", message: error.message })
  }
}
