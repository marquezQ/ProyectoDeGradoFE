
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal = ({ open, onClose, title, children }: CustomModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" 
            fullWidth  
            disableEnforceFocus 
            disableAutoFocus 
            disablePortal={true} 
            container={document.body}>
      <DialogTitle className="flex justify-between items-center">
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{maxHeight:"100vh"}}>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;
