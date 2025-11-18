import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Toaster } from 'react-hot-toast'

import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './App.routes'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function App() {
  return (
    <>
    <AppRoutes />
   <Toaster
  position="bottom-left"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#fff",
      color: "#000",
      fontWeight: "600",
      padding: "1rem",
      borderRadius: "1rem",
    },

    success: {
      style: {
        background: "#e6ffe6", 
        color: "#0f8a0f",     
      },
      icon: <CheckCircleOutlineIcon className="w-6 h-6 text-green-500" />,
    },

    error: {
      style: {
        background: "#ffe6e6",
        color: "#d40000",      
      },
      icon: <HighlightOffIcon className="w-6 h-6 text-red-500" />,
    },
  }}
/>

      </>
  )
}

export default App
