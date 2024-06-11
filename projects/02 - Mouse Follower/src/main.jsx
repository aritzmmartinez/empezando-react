import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // El StrictMode no funciona en produccion, solo en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
