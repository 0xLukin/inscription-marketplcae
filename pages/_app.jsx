import "../styles/globals.css"

import { Web3Provider } from "providers/Web3"
import Headers from "@/components/layout/Header"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Headers />
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp
