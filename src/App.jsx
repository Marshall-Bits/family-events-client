import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import NewEventPage from './pages/NewEventPage'
import EventPage from './pages/EventPage'
import Popup from './components/Popup'
import { useContext } from 'react'
import { popupContext } from './context/popup.context'

function App() {
  const { showPopup } = useContext(popupContext);


  return (
    <>
      <Navbar />
      {showPopup && <Popup />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-event" element={<NewEventPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
