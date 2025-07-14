import { login } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderLogin(container) {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p>¿No tienes cuenta? <a href="/register" id="go-register">Regístrate</a></p>
  `;

  document.getElementById('go-register').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/register');
  });

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      await login(username, password);
      navigateTo('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  });
}
