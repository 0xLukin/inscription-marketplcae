import "../styles/globals.css"

import { Web3Provider } from "providers/Web3"
import Headers from "@/components/layout/Header"
import { WalletProvider } from "@/contexts/WalletContext"
import { WebhookProvider } from "@/contexts/WebhookContext"
import { AuthenticationProvider } from "@/contexts/AuthenticationContext"
import { Toaster } from "@/components/ui/toaster"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <AuthenticationProvider>
        <WalletProvider>
          <WebhookProvider>
            <Headers />
            <Component {...pageProps} />
            <Toaster />
          </WebhookProvider>
        </WalletProvider>
      </AuthenticationProvider>
    </Web3Provider>
  )
}

export default MyApp
