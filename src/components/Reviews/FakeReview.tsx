import { Review } from "../../Interfaces/ReviewInterface";
import ReviewCard from "./ReviewCard";

function FakeReview() {
  return (
    <ReviewCard review={exampleReview}/>
  )
}export default FakeReview

const exampleReview: Review = {
  id: "1",
  contrato_id: "1",
  comment:
    "Encargué mi cocina a este carpintero y la verdad quedé muy satisfecha con el resultado. Cumplió con todo lo que acordamos en diseño y calidad, los muebles quedaron muy bonitos y bien terminados. Lo único es que la entrega se retrasó algunos días, pero valió la pena porque el trabajo final quedó excelente. En general, lo recomiendo.",
  recommend: true,
  images: {
    image1:
      "https://showplacecabinetry.com/wp-content/uploads/2022/03/NaturalFarmhouse1.jpg",
    image2:
      "https://showplacecabinetry.com/wp-content/uploads/2022/03/NaturalFarmhouse5.jpg",
    image3:
      "https://showplacecabinetry.com/wp-content/uploads/2022/03/NaturalFarmhouse6.jpg",
  },
  calificacion: {
    id: "1",
    reseña_id: "1",
    time: 2,
    quality: 5,
    communication: 5,
    price: 4,
    final: 4,
  },
  contrato: {
    id: "1",
    trabajador_id: "1",
    user_id: "12",
    title: "Cocina en Melamina",
    status: "finalizado",
    start_date: "2025-01-30 10:00:00",
    end_date: "2025-04-01 18:00:00",
    details: "{\"aqui\":\"los detalees\"}",
    created_at: "2025-10-01T00:00:00Z",
    user: {
      id: 12,
      name: "Melvi",
      lastname: "Cabero",
      email: "melvi@gmail.com",
      phone_number: "70112012",
      profile_picture:
        "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW4lMjA0MHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      email_verified: false,
      created_at: "",
      updated_at: "",
    },
    trabajador: {
      id: "1",
      user_id: "1",
      description:
        "En Belmonte Muebles nos especializamos en la fabricación de todo tipo de muebles y cocinas a medida en la ciudad de Cochabamba. Ofrecemos soluciones completas para el amoblado de casas y departamentos, cuidando cada detalle en diseño, resistencia y acabado.",
      workshop: "Belmonte Muebles",
      latitud: "-17.373592",
      longitud: "-66.157783",
      address: "Calle Buenos Aires y Trinidad",
      images: {
        image1:
          "https://images.unsplash.com/photo-1567016534-1b4f84e80b52?auto=format&fit=crop&w=600&q=80",
        image2:
          "https://images.unsplash.com/photo-1600585153837-5d27b3b47a8a?auto=format&fit=crop&w=600&q=80",
        image3:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=600&q=80",
        image4:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
        image5:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      },
      totalReviews: "25",
      averageRating: 4.6,
      user: {
        id: 1,
        name: "Jorge",
        lastname: "Belmonte Vargas",
        email: "jorge.belmonte@gmail.com",
        phone_number: "63439556",
        profile_picture:
          "",
        email_verified: false,
        created_at: "",
        updated_at: "",
      },
    },
  },
  created_at: "2025-09-29T17:47:22.000000Z",
};
