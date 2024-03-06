import { Outlet } from "react-router-dom"

import Navigation from "../components/Navigation.jsx"
import { CryptoProvider } from "../context/CryptoContext.jsx"
import { StorageProvider } from "../context/StorageContext.jsx"
import { TrendingProvider } from "../context/TrendingContext.jsx"

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main
            className="w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-nunito
    "
          >
            <div className="w-screen h-screen bg-gray-300 fixed -z-10" />

            <Navigation />

            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  )
}

export default Home
