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

function App() {

  return (
    <div className="min-h-screen">
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage/>} />
            <Route path="/workers" element={<WorkersPage/>} />
            <Route path="/workers/workerProfile/:id" element={<CarpenterProfile/>}/>
            <Route path="/minipdf" element={<MiniForm/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/registerCarp" element={<RegisterCarpenterPage/>}/>
            {/* <Route path="/example" element={<MapWithLocation/>}/> */}
            <Route path="/user/:id" element={<UserProfile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </div>
  )
}

export default App
