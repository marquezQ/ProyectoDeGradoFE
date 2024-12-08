import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import WorkersPage from "./Pages/WorkersPage";
import LoginPage from "./Pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import RegisterPage from "./Pages/RegisterPage";
import RegisterCarpenterPage from "./Pages/RegisterCarpenterPage";

function App() {

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage/>} />
            <Route path="/workers" element={<WorkersPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/registerCarp" element={<RegisterCarpenterPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </div>
  )
}

export default App
