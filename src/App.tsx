import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import WorkersPage from "./Pages/WorkersPage";
import LoginPage from "./Pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage/>} />
            <Route path="/workers" element={<WorkersPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registro" element={<div>hola registro</div>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
