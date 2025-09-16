import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/logoNavbar.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, worker, LogOut } = useAuthContext();

  const [showLogOut, setshowLogOut] = useState(false);
  const closeShowLogOut = () => setshowLogOut(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <nav className="bg-[#2C0E06] text-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} style={{width: "3.5rem", height: "2.5rem"}} />
              <Typography variant="h5" className="ml-2" style={{ color: "white", fontWeight:"600" }}>
                CarpinPro
              </Typography>
            </Link>
          </div>

          {/* Opciones Centrales */}
          <div className="hidden lg:flex lg:flex-1 justify-center">
            <Link to="/" className="hover:text-[#e5b179] px-2 xl:px-6 py-2">
              <Typography style={{ color: "inherit", fontWeight: "600", fontSize: "1.1rem" }}>
                Inicio
              </Typography>
            </Link>
            <Link to="/workers" className="hover:text-[#e5b179] px-2 xl:px-6 py-2">
              <Typography style={{ color: "inherit", fontWeight: "600", fontSize: "1.1rem" }}>
                Carpinteros
              </Typography>
            </Link>
          </div>

          {/* Botones de Usuario */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link to={`/user/${user.id}`} className="hover:text-[#e5b179]">
                  <Typography style={{ color: "inherit", fontWeight: "600" }}>
                    {user.name} {user.lastname}
                  </Typography>
                </Link>
                {!worker && (
                  <Link to="/registerCarp">
                    <Button variant="contained" color="secondary">
                      Hazte Carpintero
                    </Button>
                  </Link>
                )}
                <Button variant="outlined" color="inherit" onClick={()=>setshowLogOut(true)}>
                    Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" color="inherit" sx={{fontSize:"1rem"}}>
                      Iniciar Sesión   
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="secondary" sx={{fontSize:"1rem"}}>
                      Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Menú Móvil */}
          <div className="lg:hidden">
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
              <div className="flex flex-col justify-between h-screen w-56 bg-[#2C0E06] text-white p-6">
                {/* Enlace superior */}
                <div className="flex flex-col gap-6 pt-4" onClick={toggleDrawer(false)}>
                  <Link to="/" className="hover:text-[#e5b179] px-2 xl:px-6 py-2">
                    <Typography style={{ color: "inherit", fontWeight: "600", fontSize: "1.2rem" }}>
                      Inicio
                    </Typography>
                  </Link>
                  <Link to="/workers" className="hover:text-[#e5b179] px-2 xl:px-6 py-2">
                    <Typography style={{ color: "inherit", fontWeight: "600", fontSize: "1.2rem" }}>
                      Carpinteros
                    </Typography>
                  </Link>
                </div>

                {/* Sección de Usuario */}
                <div className="flex flex-col gap-4" onClick={toggleDrawer(false)}>
                  {user ? (
                    <>
                      <Link to={`/user/${user.id}`}>
                        <Typography style={{ color: "inherit", fontWeight: "600" }}>
                          {user.name} {user.lastname}
                        </Typography>
                      </Link>
                      {!worker && (
                        <Link to="/registerCarp">
                          <Button variant="contained" color="secondary" className="w-full">
                            Hazte Carpintero
                          </Button>
                        </Link>
                      )}
                      <Button variant="outlined" color="inherit" onClick={()=>setshowLogOut(true)} className="w-full">
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                        <Link to="/login">
                          <Button variant="outlined" color="inherit" className="w-full">
                            Iniciar Sesión
                          </Button>
                        </Link>
                        <Link to="/register">
                          <Button variant="contained" color="secondary" className="w-full">
                              Registrarse
                          </Button>
                        </Link>
                    </>
                  )}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
      <Dialog open={showLogOut} onClose={closeShowLogOut} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres cerrar sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShowLogOut} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={LogOut} variant="contained">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Navbar;
