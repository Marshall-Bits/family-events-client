import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import NewEventPage from './pages/NewEventPage'
import EventPage from './pages/EventPage'

function App() {

  return (
    <>
      <Navbar />
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
