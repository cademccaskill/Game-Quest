import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // ✅ Add this import
import { App } from './App.jsx'  // ✅ Change to named import
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* ✅ Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)