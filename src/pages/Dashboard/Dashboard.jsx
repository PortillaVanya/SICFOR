import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTickets } from '../../context/TicketContext'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const { obtenerTicketsPorEstado, eliminarTicket } = useTickets()
  const [filtroActivo, setFiltroActivo] = useState('Abiertos')

  const ticketsFiltrados = obtenerTicketsPorEstado(filtroActivo)

  const getPrioridadClase = (prioridad) => {
    const clases = {
      'Baja': 'prioridad-baja',
      'Media': 'prioridad-media',
      'Alta': 'prioridad-alta',
      'Urgente': 'prioridad-urgente'
    }
    return clases[prioridad] || ''
  }

  const getEstadoClase = (estado) => {
    const clases = {
      'Abierto': 'estado-abierto',
      'En proceso': 'estado-proceso',
      'Cerrado': 'estado-cerrado'
    }
    return clases[estado] || ''
  }

  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }

  const handleEliminar = (e, id) => {
    e.stopPropagation()
    if (window.confirm('¿Está seguro de eliminar este ticket?')) {
      eliminarTicket(id)
    }
  }

  return (
    <div className="dashboard">
      {/* Botón Crear Ticket */}
      <div className="crear-ticket-section">
        <button 
          className="btn-crear-ticket"
          onClick={() => navigate('/crear-ticket')}
        >
          <span className="btn-icon">+</span>
          CREAR TICKET DE SOPORTE
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros-section">
        <h2 className="section-title">Mis Tickets</h2>
        <div className="filtros-tabs">
          <button
            className={`tab ${filtroActivo === 'Abiertos' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('Abiertos')}
          >
            Mis Tickets Abiertos
          </button>
          <button
            className={`tab ${filtroActivo === 'Cerrados' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('Cerrados')}
          >
            Cerrados
          </button>
        </div>
      </div>

      {/* Tabla de Tickets */}
      <div className="tickets-section">
        <h3 className="section-subtitle">LISTA DE TICKETS</h3>
        
        {ticketsFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>No hay tickets {filtroActivo.toLowerCase()} en este momento</p>
          </div>
        ) : (
          <div className="tickets-table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ASUNTO</th>
                  <th>CATEGORÍA</th>
                  <th>PRIORIDAD</th>
                  <th>FECHA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {ticketsFiltrados.map((ticket) => (
                  <tr 
                    key={ticket.id}
                    onClick={() => navigate(`/ticket/${ticket.id}`)}
                    className="ticket-row"
                  >
                    <td className="ticket-id">{ticket.id}</td>
                    <td className="ticket-asunto">
                      <div className="asunto-content">
                        <span className="asunto-text">{ticket.asunto}</span>
                        <span className={`estado-badge ${getEstadoClase(ticket.estado)}`}>
                          {ticket.estado}
                        </span>
                      </div>
                    </td>
                    <td className="ticket-categoria">{ticket.categoria}</td>
                    <td>
                      <span className={`prioridad-badge ${getPrioridadClase(ticket.prioridad)}`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td className="ticket-fecha">{formatearFecha(ticket.fechaCreacion)}</td>
                    <td className="ticket-acciones" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn-accion btn-ver"
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                        title="Ver ticket"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-accion btn-editar"
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                        title="Editar ticket"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-accion btn-eliminar"
                        onClick={(e) => handleEliminar(e, ticket.id)}
                        title="Eliminar ticket"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
