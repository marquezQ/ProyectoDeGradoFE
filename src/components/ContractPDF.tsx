import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ContractWithClientAndWorker } from "../Interfaces/ContractInterface";
import logo from "../assets/logobeta.png";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottom: "1px solid #964B00",
    paddingBottom: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  companyInfo: {
    flexGrow: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A2C00",
    paddingBottom: 5,
  },
  companyText: {
    fontSize: 12,
    color: "#4B2E1D",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6A2C00",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #eee",
  },
  label: {
    color: "#555",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#555",
  },
  signature: {
    marginTop: 40,
    paddingTop: 20,
    textAlign: "center",
    borderTop: "1px solid #eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    width: "48%",
  },
  paragraph: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 10,
    color: "#555",
  },
  nameHighlight: {
    color: "#000",
  },
});

const ContractPDF: React.FC<{ contract: ContractWithClientAndWorker }> = ({ contract }) => {
  const details = typeof contract.details === "string"
    ? JSON.parse(contract.details)
    : contract.details;

  const formattedDate = new Date(contract.created_at).toLocaleDateString("es-ES");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.logoContainer}>
              <Image src={logo} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{contract.trabajador.workshop}</Text>
              <Text style={styles.companyText}>{contract.trabajador.address}</Text>
              <Text style={styles.companyText}>Tel: {contract.trabajador.user.phone_number}</Text>
              <Text style={styles.companyText}>Email: {contract.trabajador.user.email}</Text>
            </View>
          </View>
          <Text style={styles.dateText}>Fecha: {formattedDate}</Text>
        </View>

        {/* Título */}
        <Text style={{ ...styles.companyName, textAlign: "center", marginBottom: 10 }}>
          CONTRATO
        </Text>

        {/* Párrafo legal */}
        <View style={styles.paragraph}>
          <Text>
            Entre el Sr.{" "}
            <Text style={styles.nameHighlight}>
              {contract.trabajador.user.name} {contract.trabajador.user.lastname}
            </Text>
            , en adelante denominado "EL FABRICANTE", y el Sr(a).{" "}
            <Text style={styles.nameHighlight}>
              {contract.user.name} {contract.user.lastname}
            </Text>
            , en adelante denominado "EL CLIENTE", celebran mediante este documento un
            Contrato titulado: <Text style={styles.nameHighlight}>{contract.title}</Text> bajo las siguientes condiciones:
          </Text>
        </View>

        {/* Secciones del contrato */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de Inicio:</Text>
              <Text style={styles.text}>{new Date(contract.start_date).toLocaleDateString("es-ES")}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de Finalización:</Text>
              <Text style={styles.text}>{new Date(contract.end_date).toLocaleDateString("es-ES")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>DETALLES DEL CONTRATO</Text>
          {Object.entries(details).map(([key, value]) => (
            <View key={key}>
              <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
              <Text style={styles.text}>{String(value)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.signature}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>________________________</Text>
              <Text>{contract.user.name} {contract.user.lastname}</Text>
              <Text>Cliente</Text>
            </View>
            <View style={styles.column}>
              <Text>________________________</Text>
              <Text>{contract.trabajador.user.name} {contract.trabajador.user.lastname}</Text>
              <Text>Fabricante</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ContractPDF;
