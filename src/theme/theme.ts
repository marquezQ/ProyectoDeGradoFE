import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#654b43', 
      contrastText: '#ffffff', // Texto blanco
    },
    secondary: {
      main: '#3b82f6', 
    },
    // error: {
    //     main: '#dc2626', // Colores para mensajes de error
    //     light: '#f87171',
    //     dark: '#b91c1c',
    //     contrastText: '#ffffff',
    //   },
    //   warning: {
    //     main: '#f59e0b', // Colores para advertencias
    //     light: '#fbbf24',
    //     dark: '#d97706',
    //     contrastText: '#000000',
    //   },
    //   info: {
    //     main: '#2563eb', // Colores para información
    //     light: '#60a5fa',
    //     dark: '#1e40af',
    //     contrastText: '#ffffff',
    //   },
    //   success: {
    //     main: '#22c55e', // Colores para mensajes de éxito
    //     light: '#4ade80',
    //     dark: '#15803d',
    //     contrastText: '#ffffff',
    //   },
    //   background: {
    //     default: '#f3f4f6', // Color de fondo general de la app
    //     paper: '#ffffff', // Color de fondo de tarjetas o modales
    //   },
    //   text: {
    //     primary: '#374151', // Color principal del texto
    //     secondary: '#6b7280', // Color del texto secundario
    //     disabled: '#9ca3af', // Color del texto deshabilitado
    //   },
    //   action: {
    //     active: '#374151', // Color de iconos activos
    //     hover: '#e5e7eb', // Color de fondo al pasar el mouse
    //     selected: '#d1d5db', // Color de fondo al seleccionar
    //     disabled: '#9ca3af', // Color de iconos deshabilitados
    //     disabledBackground: '#f3f4f6', // Fondo de botones deshabilitados
    //   },
    //   divider: '#d1d5db', // Color de divisores entre elementos
    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px', // Redondeado similar a Tailwind
          textTransform: 'none', // Sin mayúsculas por defecto
        },
      },
    },
  },
});

export default theme;
