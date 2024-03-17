import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AddParticipantProvider from './context/AddParticipant.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddParticipantProvider>
      <Router>
        <App />
      </Router>
    </AddParticipantProvider>
  </React.StrictMode>,
)
