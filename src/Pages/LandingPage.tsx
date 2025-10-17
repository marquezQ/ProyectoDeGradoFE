import React from 'react';
import { Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import StarIcon from '@mui/icons-material/Star';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LivingIcon from '@mui/icons-material/Living';
import CallIcon from '@mui/icons-material/Call';
import image from '../assets/fondo.png'
import { Link } from 'react-router-dom';
import FakeReview from '../components/Reviews/FakeReview';
const Landing: React.FC = () => {
  const Hero = () => (
    <div className="relative min-h-screen w-full flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt="Carpintería artesanal" 
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" /> */}
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 max-w-2xl mx-auto">
        <Typography
          component="h1"
          variant="inherit"
          color='primary'
          className="text-white font-bold leading-tight !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl mb-4"
        >
          Conecta con los mejores carpinteros de tu ciudad
        </Typography>



        <Typography 
          variant="h6" 
          className="text-white/90 mb-8 text-base sm:text-lg"
        >
          Encuentra carpinteros profesionales, gestiona contratos digitales 
          y consulta reseñas confiables para tus proyectos.
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={"/workers"}>
            <Button 
            variant="contained" 
            size="large"
            startIcon={<SearchIcon />}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3"
          >
            Explorar Carpinteros
          </Button>
          </Link>
          
          
        </div>
      </div>
    </div>
  );

  const Features = () => {
    const features = [
      {
        icon: <ContentPasteSearchIcon fontSize="large" color='primary' />,
        title: 'Perfiles Completos',
        description: 'de carpinteros, incluyendo especialidades, ubicación y medios de contacto.',
      },
      {
        icon: <StarIcon fontSize="large" color='primary' />,
        title: 'Leer opiniones reales',
        description: 'y calificaciones de otros clientes.',
      },
      {
        icon: <CameraAltIcon fontSize="large" color='primary' />,
        title: 'Generar contratos digitales',
        description: 'fácilmente para formalizar tus proyectos.',
      },
      {
        icon: <DescriptionIcon fontSize="large" color='primary' />,
        title: 'Descubrir productos en venta',
        description: 'muebles a medida y creaciones artesanales.',
      },
      {
        icon: <LivingIcon fontSize="large" color='primary' />,
        title: 'Explorar galerías ',
        description: 'de trabajos realizados por cada carpintero.',
      },
      {
        icon: <CallIcon fontSize="large" color='primary' />,
        title: 'Contactar directamente',
        description: 'al carpintero sin intermediarios.',
      },
    ];

    return (
      <div className="py-16 md:py-20 bg-gray-50 max-w-7xl">
        <div className="text-center px-4 flex flex-col items-center justify-center w-full">
          <Typography
            variant="h2"
            className="text-2xl sm:text-3xl font-bold mb-4 text-primary-900"
          >
            ¿Qué es CarpinPro?
          </Typography>
          <Typography
            className="!mb-12"
          >
            CarpinPro es una plataforma digital diseñada para dar visibilidad a los pequeños y medianos carpinteros de Cochabamba. Conectamos a clientes con profesionales de confianza, de forma rápida y segura.
          </Typography>
          <Typography
            variant="h4"
            className='!mb-6'
          >
            En nuestra plataforma puedes:
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 text-center">
                {feature.icon}
              </div>
              <Typography variant="h6" color="primary" className="text-center">
                {feature.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600 text-center">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Testimonials = () => {

    return (
      
      <div className="py-16 md:py-20 bg-primary-50 px-4">
        <Typography 
          variant="h3" 
          className="font-bold mb-6 text-2xl sm:text-3xl md:text-4xl pb-5">Únete, explora perfiles y comparte tus reseñas con otros usuarios</Typography>
        <FakeReview/>
      </div>
    );
  };

  const CallToAction = () => (
    <div className="py-16 md:py-20 bg-primary-900 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <Typography 
          variant="h3" 
          className="font-bold mb-6 text-2xl sm:text-3xl md:text-4xl"
        >
          ¿Listo para transformar tus proyectos de carpintería?
        </Typography>

        <Typography 
          variant="body1"
          className="pb-6"
        >
          Únete a la comunidad de CarpinPro y conecta con los mejores profesionales.
        </Typography>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={"/register"}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAddIcon />}
            className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3"
          >
            Crear una cuenta
          </Button>
          </Link>
          <Link to={"/workers"}>
            <Button
            variant="outlined"
            size="large"
            startIcon={<SearchIcon />}
            className="border-white text-white hover:bg-white/10 px-6 py-3"
          >
            Explorar carpinteros
          </Button>
          </Link>
          
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Landing;
