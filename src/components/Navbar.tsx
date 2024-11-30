import { Link } from "react-router-dom";
import { Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import HardwareIcon from '@mui/icons-material/Hardware';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <nav className=" shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <HardwareIcon sx={{ width:"3.5rem", height:"3.5rem"}}/>
              <span className="ml-2 text-xl font-semibold">CarpinPro</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-amber-800 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </Link>
            <Link to="/workers" className="text-amber-800 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium">
              Servicios
            </Link>
            {/* Aqui se debera mostrar el avatar en caso de estar logeado y un adropdow para cerrar o ver perfil */}
            <Link to={'/login'}>
            <Button variant="outlined" color="primary">
              Iniciar Sesión
            </Button>
            </Link>
            <Link to={'/registro'}>
            <Button variant="outlined" color="primary">
              Registrarse
            </Button>
            </Link>
            
            
          </div>
          <div className="md:hidden">
            <IconButton onClick={toggleDrawer(true)} color="primary">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
              <nav className="flex flex-col gap-4 p-4">
                <Link to="/" className="text-amber-800 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleDrawer(false)}>
                  Inicio
                </Link>
                <Link to="/workers" className="text-amber-800 hover:bg-amber-100 px-3 py-2 rounded-md text-sm font-medium" onClick={toggleDrawer(false)}>
                  Servicios
                </Link>
                <Button variant="outlined" color="primary" onClick={toggleDrawer(false)}>
                  Iniciar Sesión
                </Button>
              </nav>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

