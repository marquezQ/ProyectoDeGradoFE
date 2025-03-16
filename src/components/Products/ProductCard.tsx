import { Typography, Button, Dialog, DialogTitle, IconButton, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../Interfaces/ProductInterface";
import FormNewProduct from "./FormNewProduct";
import { useState } from "react";
import { deleteProduct } from "../../services/workerApi";
import Swal from "sweetalert2";

interface Props {
  Product: Product;
  edit: boolean
  reload:()=> void
}

function ProductCard({ Product, edit, reload }: Props) {
    const [showEdit, setShowEdit] = useState(false);
    const closeEdit = () => setShowEdit(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const closeDeleteDialog = () => setShowDeleteDialog(false);

    const handleDelete = async () => {
      try {
        await deleteProduct(Product.id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Eliminado con éxito",
          showConfirmButton: false,
          timer: 1500,
      });
        reload(); // Recargar productos después de eliminar
        closeDeleteDialog();
      } catch {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error:",
          showConfirmButton: false,
          timer: 1500,
      });
      }
    };
  return (
    <div className="bg-white flex flex-col shadow-lg border relative">
      <div className="relative">
        <img src={Product.image} alt="" className="w-full h-60 object-cover" />
              {edit && <div className="absolute top-2 right-2 flex space-x-2">
                  <Button size="small" variant="contained" onClick={()=>setShowEdit(true)}>
                      <Edit fontSize="small" sx={{ color: "white" }} />
                  </Button>
                  <Button size="small" variant="contained" onClick={()=> setShowDeleteDialog(true)}>
                      <Delete fontSize="small" sx={{ color: "whitesmoke" }} />
                  </Button>
              </div>
              }
      </div>

      <div className="flex flex-col pl-5">
        <div className="flex flex-col lg:flex-row justify-between pr-2">
          <Typography variant="h6" color="primary">
            {Product.name}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className="lg:pt-2 font-bold"
          >
            Stock: {Product.stock}
          </Typography>
        </div>
        <div>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ fontWeight: "bold", fontSize: "1rem", paddingBottom: "1rem" }}
          >
            Bs.- {Product.price}
          </Typography>
        </div>
      </div>
      <Dialog maxWidth="sm" fullWidth open={showEdit} onClose={closeEdit}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Editar Producto
          <IconButton onClick={closeEdit}>
              <CloseIcon />
          </IconButton>
        </DialogTitle>
        <FormNewProduct workerID={Product.trabajador_id} fetchProducts={reload} closeForm={closeEdit} productToEdit={Product} />
      </Dialog>

      <Dialog open={showDeleteDialog} onClose={closeDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres eliminar este producto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductCard;
