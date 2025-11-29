import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTickets } from '../../context/TicketContext'
import './CrearTicket.css'

function CrearTicket() {
  const navigate = useNavigate()
  const { crearTicket, currentUser } = useTickets()
  
  const [formData, setFormData] = useState({
    asunto: '',
    categoria: 'Técnico',
    prioridad: 'Alta',
    descripcion: ''
  })

  const categorias = ['Técnico', 'Administrativo', 'Académico', 'Software', 'Hardware']
  const prioridades = ['Baja', 'Media', 'Alta', 'Urgente']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.asunto.trim() || !formData.descripcion.trim()) {
      alert('Por favor complete todos los campos requeridos')
      return
    }

    const nuevoTicket = crearTicket(formData)
    alert(`Ticket #${nuevoTicket.id} creado exitosamente`)
    navigate('/')
  }

  const handleCancelar = () => {
    if (window.confirm('¿Desea cancelar la creación del ticket?')) {
      navigate('/')
    }
  }

  return (
    <div className="crear-ticket-page">
      <div className="crear-ticket-container">
        <h2 className="page-title">CREAR TICKET</h2>
        
        <form onSubmit={handleSubmit} className="ticket-form">
          {/* Usuario */}
          <div className="form-section user-section">
            <div className="user-photo">
              <img src={currentUser.foto} alt={currentUser.nombre} />
            </div>
            <div className="user-name">
              <h3>{currentUser.nombre}</h3>
            </div>
          </div>

          {/* Asunto */}
          <div className="form-group">
            <label htmlFor="asunto" className="form-label">
              Asunto: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese el asunto del ticket"
              required
            />
          </div>

          {/* Categoría y Prioridad */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoria" className="form-label">
                Categoría:
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="form-select"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prioridad" className="form-label">
                Prioridad:
              </label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="form-select"
              >
                {prioridades.map(pri => (
                  <option key={pri} value={pri}>{pri}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">
              Descripción: <span className="required">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describa detalladamente su problema o solicitud"
              rows="6"
              required
            />
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" className="btn btn-guardar">
              GUARDAR
            </button>
            <button 
              type="button" 
              className="btn btn-cancelar"
              onClick={handleCancelar}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrearTicket
