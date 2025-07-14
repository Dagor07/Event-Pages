import { isAuthenticated, getCurrentUser } from './auth.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderDashboardAdmin } from './views/dashboardAdmin.js';
import { renderDashboardVisitor } from './views/dashboardVisitor.js';
import { renderCreateEvent } from './views/createEvent.js';
import { renderEnrollments } from './views/enrollments.js';
import { renderNotFound } from './views/notFound.js';

const routes = {
  '/login': renderLogin,
  '/register': renderRegister,
  '/dashboard': () => {
    const user = getCurrentUser();
    if (user.role === 'admin') return renderDashboardAdmin();
    else return renderDashboardVisitor();
  },
  '/dashboard/events/create': renderCreateEvent,
  '/dashboard/enrollments': renderEnrollments,
};

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById('app');

  if (isAuthenticated() && (path === '/login' || path === '/register')) {
    return navigateTo('/dashboard');
  }

  const publicRoutes = ['/login', '/register'];
  if (!isAuthenticated() && !publicRoutes.includes(path)) {
    return navigateTo('/not-found');
  }

  const view = routes[path] || renderNotFound;
  app.innerHTML = '';
  view(app);
}

export function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path);
  router();
}

window.addEventListener('popstate', router);

