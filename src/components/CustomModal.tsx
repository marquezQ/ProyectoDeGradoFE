
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal = ({ open, onClose, title, children }: CustomModalProps) => {
  return (
    <Dialog
        maxWidth="lg"
        open={open}
        onClose={onClose}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CustomModal;

