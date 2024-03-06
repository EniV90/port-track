import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Crypto from "./pages/Crypto"
import Referral from "./pages/Referral"

import Wallet from "./pages/Wallet"
import CryptoDetails from "./components/CryptoDetails"
import ReferralSignup from "./pages/ReferralSignup"
import EmailVerification from "./pages/EmailVerification"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/referral",
        element: <Referral />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },

      {
        path: "/wallet",
        element: <Wallet />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/signup",
        element: <Signup />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/referralsignup",
        element: <ReferralSignup />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/emailverification",
        element: <EmailVerification />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDetails />,
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
