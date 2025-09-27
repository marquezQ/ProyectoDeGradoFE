import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import WorkersPage from "./Pages/WorkersPage";
import LoginPage from "./Pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import RegisterPage from "./Pages/RegisterPage";
import RegisterCarpenterPage from "./Pages/RegisterCarpenterPage";
// import MapWithLocation from "./Pages/exampleMap";
import CarpenterProfile from "./Pages/CarpenterProfile";
import MiniForm from "./Pages/pdf";
import UserProfile from "./Pages/UserProfile";
import PrivateRoute from "./GuardRouter/PrivateRoute";
import RegisterRoute from "./GuardRouter/RegisterRoute";
import ScrollToTop from "./components/scroll";

function App() {

  return (
    <div className="min-h-screen">
    <AuthContextProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage/>} />
            <Route path="/workers" element={<WorkersPage/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/workers/workerProfile/:id" element={<CarpenterProfile/>}/>
              <Route path="/user/:id" element={<UserProfile/>} />
            </Route>
            <Route path="/minipdf" element={<MiniForm/>} />
            <Route element={<RegisterRoute/>}>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
            </Route> 
            <Route path="/registerCarp" element={<RegisterCarpenterPage/>}/>
            {/* <Route path="/example" element={<MapWithLocation/>}/> */}
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </div>
  )
}

export default App
