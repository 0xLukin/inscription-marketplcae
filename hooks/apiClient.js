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
      clearCredentials()
      return null
    }

    try {
      const response = await fetch("/api/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        clearCredentials()
        return null
      }

      const data = await response.json()
      setTokens(data.tokens)
      return data.tokens.access.token
    } catch (error) {
      console.error("Error refreshing token:", error)
      clearCredentials()
      return null
    }
  }

  const apiClient = async (endpoint, options = {}, newAccessToken) => {
    if (!isAccessTokenValid() && !newAccessToken) {
      const newAccessToken = await refreshTokenAndGetNewAccessToken()
      if (!newAccessToken) {
        throw new Error("Token expired. You need login again.")
      }
      return apiClient(endpoint, options, newAccessToken)
    }

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${
            newAccessToken ? newAccessToken : accessToken
          }`
        }
      })

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
