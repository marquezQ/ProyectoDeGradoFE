import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Document, Page, Text, View, PDFViewer, StyleSheet, pdf } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";

// Estilos mejorados para el PDF
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 20, backgroundColor:"red" },
  section: { marginBottom: 10 },
  label: { fontWeight: "bold", marginBottom: 2 },
  text: { fontSize: 12, marginBottom: 5 },
  signature: { marginTop: 30, textAlign: "center" },
});

// Componente del PDF
const PDFTemplate: React.FC<{ name: string; lastName: string }> = ({ name, lastName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>CONTRATO DE SERVICIO</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Nombre del Cliente:</Text>
        <Text style={styles.text}>{name} {lastName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Detalles del Servicio:</Text>
        <Text style={styles.text}>Este contrato estipula los términos y condiciones para el servicio solicitado por el cliente. asdasdasdasdddddddddddddddddddddddddddddddddddddddddddddd</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Inicio:</Text>
        <Text style={styles.text}>_____________</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Finalización:</Text>
        <Text style={styles.text}>_____________</Text>
      </View>
      <View style={styles.signature}>
        <Text>________________________</Text>
        <Text>Firma del Cliente</Text>
      </View>
    </Page>
  </Document>
);

const MiniForm: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDownload = async () => {
    const doc = <PDFTemplate name={name} lastName={lastName} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contrato.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80">
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Generar Contrato
        </Button>
      </form>

      {/* Modal para mostrar el PDF */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{display:"flex", justifyContent:"space-between"}}>
          Vista Previa del Contrato
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="h-96">
            <PDFViewer width="100%" height="100%">
              <PDFTemplate name={name} lastName={lastName} />
            </PDFViewer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} variant="contained" color="secondary">
            Descargar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MiniForm;
