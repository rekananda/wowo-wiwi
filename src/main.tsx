import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// app css
import "@/assets/css/tailwind.css";
import "@/assets/css/font.css";
import "@/assets/css/global.scss";
import "@/assets/css/mantine.scss";
// mantine css
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/nprogress/styles.css'
// plugin css
import "react-toastify/dist/ReactToastify.css"

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
