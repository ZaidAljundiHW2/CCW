import { Provider } from "./components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from "react-helmet-async"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)