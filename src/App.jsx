import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import CrearTicket from './pages/CrearTicket/CrearTicket'
import VerTicket from './pages/VerTicket/VerTicket'
import { TicketProvider } from './context/TicketContext'
import './App.css'

function App() {
  return (
    <TicketProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crear-ticket" element={<CrearTicket />} />
            <Route path="/ticket/:id" element={<VerTicket />} />
          </Routes>
        </Layout>
      </Router>
    </TicketProvider>
  )
}

export default App
