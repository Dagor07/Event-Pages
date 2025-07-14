import { register } from '../auth.js';
import { navigateTo } from '../router.js';

export function renderRegister(container) {
  container.innerHTML = `
    <h2>Registro</h2>
    <form id="register-form">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="/login" id="go-login">Iniciar sesión</a></p>
  `;

  document.getElementById('go-login').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/login');
  });

  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      await register(username, password);
      navigateTo('/dashboard');
    } catch (err) {
      alert('Error al registrarse');
    }
  });
}
