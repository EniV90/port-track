import React from "react"
import { ReactDOM } from "react"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SWRConfig } from "swr"
import Home from "./pages/Home"
import Coin from "./pages/Coin"
import Navbar from "./components/Navbar"
import Tracker from "./pages/Tracker"
import NotFound from "./components/NotFound.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
        provider: () => new Map(),
      }}
    >
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/coin">
              <Route path=":coin" element={<Coin />} />
            </Route>
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
)
