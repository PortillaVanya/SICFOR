import { useTickets } from '../../context/TicketContext'
import './Layout.css'

function Layout({ children }) {
  const { currentUser } = useTickets()

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1 className="header-title">MESA DE AYUDA / SOPORTE</h1>
              <span className="header-subtitle">Sistema SICFOR - Grupo J</span>
            </div>
            <div className="header-right">
              <div className="user-info">
                <img 
                  src={currentUser.foto} 
                  alt={currentUser.nombre}
                  className="user-avatar"
                />
                <div className="user-details">
                  <span className="user-name">{currentUser.nombre}</span>
                  <span className="user-role">Rol: {currentUser.rol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Pie de página - SICFOR © 2023 | Grupo J - Mesa de Ayuda
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
