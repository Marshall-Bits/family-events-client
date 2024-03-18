import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AddParticipantsProvider } from './context/participant.context.jsx'
import { PopupProvider } from './context/popup.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddParticipantsProvider>
      <PopupProvider>
        <Router>
          <App />
        </Router>
      </PopupProvider>
    </AddParticipantsProvider>
  </React.StrictMode>
)
