import { NavLink } from "react-router-dom"

const Navigation = () => {
  return (
    <nav
      className="w-[40%] mt-16 flex justify-around align-middle
    border border-cyan rounded-lg
    "
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/referral"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`
        }}
      >
        referral
      </NavLink>

      <NavLink
        to="/wallet"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`
        }}
      >
        wallet
      </NavLink>
    </nav>
  )
}

export default Navigation
