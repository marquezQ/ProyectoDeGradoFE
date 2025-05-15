import { Link } from "react-router-dom";
import { Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HardwareIcon from "@mui/icons-material/Hardware";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, worker, LogOut } = useAuthContext();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <nav className="bg-[#4c3a37] text-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <HardwareIcon sx={{ width: "3rem", height: "3rem", color: "white" }} />
              <span className="ml-2 text-xl font-semibold">CarpinPro</span>
            </Link>
          </div>

          {/* Opciones Centrales */}
          <div className="hidden md:flex md:flex-1 justify-center space-x-6">
            <Link to="/" className="text-white hover:text-amber-300 px-4 py-2 text-sm font-medium">
              Inicio
            </Link>
            <Link to="/workers" className="text-white hover:text-amber-300 px-4 py-2 text-sm font-medium">
              Servicios
            </Link>
          </div>

          {/* Botones de Usuario */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to={`/user/${user.id}`}>
                  <p className="text-sm font-medium">{user.name} {user.lastname}</p>
                </Link>
                {!worker && (
                  <Link to="/registerCarp">
                    <Button variant="contained" color="secondary">Hazte Carpintero</Button>
                  </Link>
                )}
                <Button variant="outlined" color="inherit" onClick={LogOut}>Cerrar Sesión</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" color="inherit">Iniciar Sesión</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="secondary">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden">
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
              <div className="flex flex-col justify-between h-screen w-64 bg-[#654b43] text-white p-6">
                {/* Enlace superior */}
                <div className="flex flex-col gap-6">
                  <Link to="/" className="text-lg font-medium hover:text-amber-300">Inicio</Link>
                  <Link to="/workers" className="text-lg font-medium hover:text-amber-300">Servicios</Link>
                </div>

                {/* Sección de Usuario */}
                <div className="flex flex-col gap-4">
                  {user ? (
                    <>
                      <p className="text-base font-medium">{user.name} {user.lastname}</p>
                      {!worker && (
                        <Link to="/registerCarp" className="text-sm text-amber-300 hover:underline">
                          Hazte Carpintero
                        </Link>
                      )}
                      <Button variant="outlined" color="inherit" onClick={LogOut} className="w-full">
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outlined" color="inherit" className="w-full">Iniciar Sesión</Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="contained" color="secondary" className="w-full">Registrarse</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
