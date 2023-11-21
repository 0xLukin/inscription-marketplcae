import { useAuthentication } from "@/contexts/AuthenticationContext"

export const useApiClient = () => {
  const {
    refreshToken,
    setTokens,
    isRefreshTokenValid,
    clearCredentials,
    accessToken,
    isAccessTokenValid
  } = useAuthentication()

  const refreshTokenAndGetNewAccessToken = async () => {
    if (!isRefreshTokenValid) {
      //@ts-ignore
      clearCredentials()
      return null
    }

    try {
      const response = await fetch("/api/v1/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        //@ts-ignore
        clearCredentials()
        return null
      }

      const data = await response.json()
      //@ts-ignore
      setTokens(data.tokens)
      return data.tokens.access.token
    } catch (error) {
      console.error("Error refreshing token:", error)
      //@ts-ignore
      clearCredentials()
      return null
    }
  }

  const apiClient = async (endpoint, options = {}, newAccessToken) => {
    //@ts-ignore
    if (!isAccessTokenValid() && !newAccessToken) {
      const newAccessToken = await refreshTokenAndGetNewAccessToken()
      if (!newAccessToken) {
        throw new Error("Token expired. You need login again.")
      }
      return apiClient(endpoint, options, newAccessToken)
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}${endpoint}`,
        {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${
              newAccessToken ? newAccessToken : accessToken
            }`
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "API Fetch Error")
      }

      return response.json()
    } catch (error) {
      console.error("API Client Error:", error)
      throw error
    }
  }

  return { apiClient, refreshTokenAndGetNewAccessToken }
}
