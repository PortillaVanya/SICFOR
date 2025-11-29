import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTickets } from '../../context/TicketContext'
import './VerTicket.css'

function VerTicket() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtenerTicket, agregarRespuesta, cerrarTicket, actualizarTicket } = useTickets()
  
  const [ticket, setTicket] = useState(null)
  const [respuesta, setRespuesta] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [datosEdicion, setDatosEdicion] = useState({})

  useEffect(() => {
    const ticketActual = obtenerTicket(id)
    if (ticketActual) {
      setTicket(ticketActual)
      setDatosEdicion({
        asunto: ticketActual.asunto,
        categoria: ticketActual.categoria,
        prioridad: ticketActual.prioridad,
        descripcion: ticketActual.descripcion
      })
    } else {
      navigate('/')
    }
  }, [id, obtenerTicket, navigate])

  const getEstadoClase = (estado) => {
    const clases = {
      'Abierto': 'estado-abierto',
      'En proceso': 'estado-proceso',
      'Cerrado': 'estado-cerrado'
    }
    return clases[estado] || ''
  }

  const formatearFechaHora = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEnviarRespuesta = (esAgente = false) => {
    if (!respuesta.trim()) {
      alert('Por favor escriba una respuesta')
      return
    }

    agregarRespuesta(id, respuesta, esAgente)
    setRespuesta('')
    
    // Actualizar ticket local
    const ticketActualizado = obtenerTicket(id)
    setTicket(ticketActualizado)
  }

  const handleCerrarTicket = () => {
    if (window.confirm('¿Está seguro de cerrar este ticket?')) {
      cerrarTicket(id)
      const ticketActualizado = obtenerTicket(id)
      setTicket(ticketActualizado)
      alert('Ticket cerrado exitosamente')
    }
  }

  const handleGuardarEdicion = () => {
    actualizarTicket(id, datosEdicion)
    setModoEdicion(false)
    const ticketActualizado = obtenerTicket(id)
    setTicket(ticketActualizado)
    alert('Ticket actualizado exitosamente')
  }

  const handleCancelarEdicion = () => {
    setDatosEdicion({
      asunto: ticket.asunto,
      categoria: ticket.categoria,
      prioridad: ticket.prioridad,
      descripcion: ticket.descripcion
    })
    setModoEdicion(false)
  }

  if (!ticket) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="ver-ticket-page">
      <div className="ver-ticket-container">
        {/* Header */}
        <div className="ticket-header">
          <div className="ticket-header-left">
            <h2 className="ticket-title">VER TICKET</h2>
            <div className="ticket-id-estado">
              <span className="ticket-id-label">Ticket ID: {ticket.id}</span>
              <span className={`estado-badge-large ${getEstadoClase(ticket.estado)}`}>
                {ticket.estado.toUpperCase()}
              </span>
            </div>
          </div>
          <button 
            className="btn-volver"
            onClick={() => navigate('/')}
          >
            ← Volver al listado
          </button>
        </div>

        {/* Información del Ticket */}
        <div className="ticket-info-section">
          {!modoEdicion ? (
            <>
              <div className="info-row">
                <div className="info-group">
                  <label>Prioridad:</label>
                  <span className={`prioridad-badge prioridad-${ticket.prioridad.toLowerCase()}`}>
                    {ticket.prioridad}
                  </span>
                </div>
                <div className="info-group">
                  <label>Categoría:</label>
                  <span className="categoria-badge">{ticket.categoria}</span>
                </div>
              </div>

              <div className="info-group full-width">
                <label>Asunto:</label>
                <p className="info-value">{ticket.asunto}</p>
              </div>

              <div className="info-group full-width">
                <label>Descripción Detallada:</label>
                <p className="info-description">{ticket.descripcion}</p>
              </div>

              <div className="info-buttons">
                <button 
                  className="btn-info-action btn-ver"
                  onClick={() => setModoEdicion(true)}
                  disabled={ticket.estado === 'Cerrado'}
                >
                  Ver / Editar
                </button>
                <button 
                  className="btn-info-action btn-responder"
                  disabled={ticket.estado === 'Cerrado'}
                >
                  Responder
                </button>
                <button 
                  className="btn-info-action btn-reabrir"
                  disabled={ticket.estado !== 'Cerrado'}
                >
                  Reabrir
                </button>
              </div>
            </>
          ) : (
            <div className="edicion-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría:</label>
                  <select
                    value={datosEdicion.categoria}
                    onChange={(e) => setDatosEdicion({...datosEdicion, categoria: e.target.value})}
                    className="form-select"
                  >
                    <option>Técnico</option>
                    <option>Administrativo</option>
                    <option>Académico</option>
                    <option>Software</option>
                    <option>Hardware</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prioridad:</label>
                  <select
                    value={datosEdicion.prioridad}
                    onChange={(e) => setDatosEdicion({...datosEdicion, prioridad: e.target.value})}
                    className="form-select"
                  >
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Asunto:</label>
                <input
                  type="text"
                  value={datosEdicion.asunto}
                  onChange={(e) => setDatosEdicion({...datosEdicion, asunto: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  value={datosEdicion.descripcion}
                  onChange={(e) => setDatosEdicion({...datosEdicion, descripcion: e.target.value})}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="edicion-buttons">
                <button className="btn btn-guardar" onClick={handleGuardarEdicion}>
                  Guardar Cambios
                </button>
                <button className="btn btn-cancelar" onClick={handleCancelarEdicion}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Historial de Respuestas */}
        <div className="respuestas-section">
          <h3 className="section-title">HISTORIAL DE RESPUESTAS</h3>
          
          <div className="respuestas-lista">
            {ticket.respuestas.length === 0 ? (
              <div className="empty-respuestas">
                <p>No hay respuestas aún. Sea el primero en responder.</p>
              </div>
            ) : (
              ticket.respuestas.map((resp) => (
                <div 
                  key={resp.id} 
                  className={`respuesta-item ${resp.esAgente ? 'respuesta-agente' : 'respuesta-usuario'}`}
                >
                  <div className="respuesta-header">
                    <span className="respuesta-autor">
                      {resp.esAgente ? '🎧 ' : '👤 '}{resp.autor}
                    </span>
                    <span className="respuesta-fecha">
                      ({formatearFechaHora(resp.fecha)})
                    </span>
                  </div>
                  <div className="respuesta-mensaje">
                    "{resp.mensaje}"
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Añadir Respuesta */}
          {ticket.estado !== 'Cerrado' && (
            <div className="anadir-respuesta">
              <h4 className="anadir-title">Añadir Respuesta...</h4>
              <textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                className="respuesta-textarea"
                placeholder="Escriba su respuesta aquí..."
                rows="4"
              />
              <div className="respuesta-buttons">
                <button 
                  className="btn btn-responder-usuario"
                  onClick={() => handleEnviarRespuesta(false)}
                >
                  Responder como Usuario
                </button>
                <button 
                  className="btn btn-responder-agente"
                  onClick={() => handleEnviarRespuesta(true)}
                >
                  Responder como Soporte
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Acción Final */}
        <div className="ticket-actions">
          <button 
            className="btn btn-cerrar-ticket"
            onClick={handleCerrarTicket}
            disabled={ticket.estado === 'Cerrado'}
          >
            CERRAR TICKET
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerTicket
