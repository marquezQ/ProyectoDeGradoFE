import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function MainPage() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default MainPage