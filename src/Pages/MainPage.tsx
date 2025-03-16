import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function MainPage() {
  return (
    <div className="pt-16">
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default MainPage