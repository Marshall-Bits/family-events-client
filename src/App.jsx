import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import EventFormPage from './pages/EventFormPage'
import EventPage from './pages/EventPage'
import Popup from './components/Popup'
import { useContext } from 'react'
import { popupContext } from './context/popup.context'
import UsersPage from './pages/UsersPage';

function App() {
  const { showPopup } = useContext(popupContext);


  return (
    <>
      <Navbar />
      {showPopup && <Popup />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-event" element={<EventFormPage />} />
        <Route path="/events/edit/:eventId" element={<EventFormPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<h1>Not Found 🙅🏻</h1>} />
      </Routes>
    </>
  )
}

export default App
