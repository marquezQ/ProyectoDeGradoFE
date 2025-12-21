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
import AdminRoute from "./GuardRouter/AdminRoute";
import AdminPage from "./Pages/AdminPage";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/AdminUsers";
import AdminCarpinteros from "./Pages/AdminCarpinteros";
import AdminProductos from "./Pages/AdminProducts";
import AdminReseñas from "./Pages/AdminResenias";
import AdminContratos from "./Pages/AdminContratos";

function App() {

  return (
    <div className="min-h-screen">
    <AuthContextProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
          {/* Rutas de Administración */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="carpinteros" element={<AdminCarpinteros />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="resenias" element={<AdminReseñas />} />
              <Route path="contratos" element={<AdminContratos />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </div>
  )
}

export default App
