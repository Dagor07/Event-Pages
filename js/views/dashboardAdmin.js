import { getCurrentUser, logout } from '../auth.js';
import { getEvents } from '../events.js';
import { navigateTo } from '../router.js';

export async function renderDashboardAdmin(container) {
  const user = getCurrentUser();
  const events = await getEvents();

  container.innerHTML = `
    <div class="sidebar">
      <h2>Events</h2>
      <p>${user.username} <span class="role">${user.role}</span></p>
      <button id="btn-logout">Logout</button>
      <button id="btn-create-event">Crear Evento</button>
    </div>
    <div class="content">
      <h3>Lista de Eventos</h3>
      <ul>
        ${events.map(e => `
          <li>
            <strong>${e.name}</strong> - ${e.description} (Capacidad: ${e.capacity})
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', () => {
    logout();
    navigateTo('/login');
  });

  document.getElementById('btn-create-event').addEventListener('click', () => {
    navigateTo('/dashboard/events/create');
  });
}

