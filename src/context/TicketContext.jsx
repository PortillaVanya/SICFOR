import { createContext, useContext, useState, useEffect } from 'react'

const TicketContext = createContext()

// Mock de usuario actual
const CURRENT_USER = {
  id: 1,
  nombre: 'Fabian Andres',
  rol: 'Usuario',
  foto: 'https://ui-avatars.com/api/?name=Fabian+Andres&background=2563eb&color=fff&size=128'
}

// Mock data inicial de tickets
const INITIAL_TICKETS = [
  {
    id: '001',
    asunto: 'Error al iniciar sesión',
    descripcion: 'No me permite entrar, dice error de credenciales',
    categoria: 'Técnico',
    prioridad: 'Alta',
    estado: 'Abierto',
    fechaCreacion: '2023-11-20T10:30:00',
    usuarioId: 1,
    respuestas: [
      {
        id: 1,
        autor: 'Soporte',
        mensaje: 'Verifique usuario correcto',
        fecha: '2023-11-20T11:00:00',
        esAgente: true
      },
      {
        id: 2,
        autor: 'Fabian Andres',
        mensaje: 'Ya lo confirmé, sigue igual',
        fecha: '2023-11-20T14:30:00',
        esAgente: false
      }
    ]
  },
  {
    id: '002',
    asunto: 'Cambio de contraseña',
    descripcion: 'Necesito cambiar mi contraseña porque la olvidé',
    categoria: 'Administrativo',
    prioridad: 'Media',
    estado: 'Cerrado',
    fechaCreacion: '2023-11-18T14:00:00',
    fechaCierre: '2023-11-19T09:00:00',
    usuarioId: 1,
    respuestas: [
      {
        id: 1,
        autor: 'Soporte',
        mensaje: 'Se ha enviado el enlace de recuperación a su correo',
        fecha: '2023-11-18T15:00:00',
        esAgente: true
      }
    ]
  },
  {
    id: '003',
    asunto: 'No carga perfil',
    descripcion: 'Cuando intento ver mi perfil la página se queda en blanco',
    categoria: 'Software',
    prioridad: 'Alta',
    estado: 'En proceso',
    fechaCreacion: '2023-11-19T11:23:00',
    usuarioId: 1,
    respuestas: []
  }
]

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('sicfor-tickets')
    return saved ? JSON.parse(saved) : INITIAL_TICKETS
  })
  
  const [currentUser] = useState(CURRENT_USER)

  useEffect(() => {
    localStorage.setItem('sicfor-tickets', JSON.stringify(tickets))
  }, [tickets])

  const crearTicket = (ticketData) => {
    const nuevoTicket = {
      id: String(tickets.length + 1).padStart(3, '0'),
      ...ticketData,
      estado: 'Abierto',
      fechaCreacion: new Date().toISOString(),
      usuarioId: currentUser.id,
      respuestas: []
    }
    setTickets([nuevoTicket, ...tickets])
    return nuevoTicket
  }

  const obtenerTicket = (id) => {
    return tickets.find(t => t.id === id)
  }

  const actualizarTicket = (id, cambios) => {
    setTickets(tickets.map(t => 
      t.id === id ? { ...t, ...cambios } : t
    ))
  }

  const eliminarTicket = (id) => {
    setTickets(tickets.filter(t => t.id !== id))
  }

  const agregarRespuesta = (ticketId, mensaje, esAgente = false) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const nuevaRespuesta = {
          id: ticket.respuestas.length + 1,
          autor: esAgente ? 'Soporte' : currentUser.nombre,
          mensaje,
          fecha: new Date().toISOString(),
          esAgente
        }
        return {
          ...ticket,
          respuestas: [...ticket.respuestas, nuevaRespuesta],
          estado: ticket.estado === 'Abierto' ? 'En proceso' : ticket.estado
        }
      }
      return ticket
    }))
  }

  const cerrarTicket = (ticketId) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          estado: 'Cerrado',
          fechaCierre: new Date().toISOString()
        }
      }
      return ticket
    }))
  }

  const obtenerTicketsPorEstado = (estado) => {
    return tickets.filter(t => 
      t.usuarioId === currentUser.id && 
      (estado === 'Abiertos' ? t.estado !== 'Cerrado' : t.estado === 'Cerrado')
    )
  }

  const value = {
    tickets,
    currentUser,
    crearTicket,
    obtenerTicket,
    actualizarTicket,
    eliminarTicket,
    agregarRespuesta,
    cerrarTicket,
    obtenerTicketsPorEstado
  }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTickets debe usarse dentro de TicketProvider')
  }
  return context
}
