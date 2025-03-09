import { Button } from "@mui/material";
import { useState } from "react";
import CustomModal from "../components/CustomModal";

function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>

      <CustomModal open={open} onClose={() => setOpen(false)} title="Mi Modal">
        <p>Este es el contenido del modal cincuenta y siete + texto para ver como se muestra y probar los diferentes tamaño que este modal puede llegar a tener </p>
      </CustomModal>
    </div>
  );
}

export default HomePage
