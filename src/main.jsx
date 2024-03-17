import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AddParticipantsProvider } from './context/participant.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddParticipantsProvider>
      <Router>
        <App />
      </Router>
    </AddParticipantsProvider>
  </React.StrictMode>
)
