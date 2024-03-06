import { useState } from "react"
import { useLocation } from "react-router"

function Referral() {
   const [referralLink, setReferralLink] = useState("")
   const [successfulReferrals, setSuccessfulReferrals] = useState(0)
   const [referralCodeGenerated, setReferralCodeGenerated] = useState(false)
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const email = queryParams.get("email")

   const generateReferralLink = () => {
     if (!referralCodeGenerated) {
       const referralCode = Math.random().toString(36).substr(2, 8)
       const link = `https://yourwebsite.com/referral-signup?ref=${referralCode}`
       setReferralLink(link)

       // Retrieve the existing user details array from local storage
       const userDetails = JSON.parse(localStorage.getItem("userDetails")) || []
       const currentUserIndex = userDetails.findIndex(
         (user) => user.email === email
       )
       // Assign the generated code to the user
       if (currentUserIndex !== -1) {
         userDetails[currentUserIndex].code = referralCode
       }
       localStorage.setItem("userDetails", JSON.stringify(userDetails))
     }
   }

   // Function to retrieve the full name of the user
   const referralCount = () => {
     const userDetails = JSON.parse(localStorage.getItem("userDetails")) || []
     const currentUserIndex = userDetails.findIndex(
       (user) => user.email === email
     )
     if (currentUserIndex !== -1) {
       return (
         userDetails[currentUserIndex].successfulReferralCount ||
         "Nobody has used your referral link to successfully signup"
       )
     }
     return
   }


  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly  border border-gray-100 rounded">
        <div className="w-full p-20">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Referral System
          </h1>
          <div className="flex flex-row justify-between">
            <div className="">
              <p>Email: {email}</p>
              <button
                onClick={generateReferralLink}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Generate Referral Link
              </button>
            </div>
          </div>
          <div className="">
            <p>Your referral link: {referralLink}</p>
            <p>Successful Referrals: {referralCount()}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Referral
