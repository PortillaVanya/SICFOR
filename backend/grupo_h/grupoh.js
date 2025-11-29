// Componente 3: Contenido
document.getElementById('content-component').innerHTML = `
    <div class="card">
        <div class="card-header">
            <h3>Gestión de Evaluaciones</h3>
            <button class="btn btn-primary" id="btn-nueva-evaluacion">Nueva Evaluación</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Evaluación</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Entregas</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>EV-001</td>
                    <td>Parcial Corte 1</td>
                    <td>Escrito</td>
                    <td>2023-10-15</td>
                    <td>25/25</td>
                    <td><span class="status status-finalizado">Finalizado</span></td>
                    <td class="actions">
                        <button class="btn btn-secondary">Ver</button>
                        <button class="btn btn-primary">Editar</button>
                        <button class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>EV-002</td>
                    <td>Taller Práctico</td>
                    <td>Práctica</td>
                    <td>2023-10-20</td>
                    <td>18/25</td>
                    <td><span class="status status-activo">Activo</span></td>
                    <td class="actions">
                        <button class="btn btn-secondary">Ver</button>
                        <button class="btn btn-primary">Editar</button>
                        <button class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>EV-003</td>
                    <td>Quiz Rápido</td>
                    <td>Oral</td>
                    <td>2023-10-22</td>
                    <td>0/25</td>
                    <td><span class="status status-pendiente">Pendiente</span></td>
                    <td class="actions">
                        <button class="btn btn-secondary">Ver</button>
                        <button class="btn btn-primary">Editar</button>
                        <button class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="footer">
        Sistema SICFOR - Módulo de Evaluaciones y Calificaciones - Grupo H<br>
        © 2023 Universidad Institucional
    </div>
`;

// Funcionalidad para cambiar de sección
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover clase activa de todos los elementos
        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Agregar clase activa al elemento clickeado
        this.classList.add('active');
        
        // Aquí puedes agregar la lógica para cambiar el contenido según la sección
        const section = this.getAttribute('data-section');
        console.log(`Cambiando a la sección: ${section}`);
        
        // Ejemplo de cambio de contenido
        if(section === 'crear') {
            alert('Funcionalidad de "Crear evaluación" será implementada aquí');
        } else if(section === 'notas') {
            alert('Funcionalidad de "Registrar notas" será implementada aquí');
        }
    });
});

// Funcionalidad para el botón "Nueva Evaluación"
document.getElementById('btn-nueva-evaluacion').addEventListener('click', function() {
    alert('Formulario para nueva evaluación será mostrado aquí');
});