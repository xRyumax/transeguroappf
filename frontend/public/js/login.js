// Función para mostrar mensajes
const showMessage = (message, isSuccess) => {
  const msgBox = document.createElement('div');
  msgBox.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'} animate-fadeIn`;
  msgBox.textContent = message;
  document.body.appendChild(msgBox);

  setTimeout(() => {
    msgBox.classList.add('animate-fadeOut');
    setTimeout(() => msgBox.remove(), 300);
  }, 3000);
};

// Validación del formulario
const validateForm = (correo, password) => {
  if (!correo || !password) {
    showMessage('Por favor complete todos los campos', false);
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    showMessage('Por favor ingrese un correo válido', false);
    return false;
  }
  if (password.length < 6) {
    showMessage('La contraseña debe tener al menos 6 caracteres', false);
    return false;
  }
  return true;
};

// Toggle para mostrar/ocultar contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  const icon = this.querySelector('i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
});

// Manejo del formulario
document.getElementById('formLogin').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = this.querySelector('button[type="submit"]');

  if (!validateForm(correo, password)) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <i class="fas fa-spinner fa-spin mr-2"></i> Verificando...
  `;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });

    const data = await res.json();

    if (res.ok && data.token && data.usuario) {
      showMessage('Inicio de sesión exitoso. Bienvenido!', true);
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirección según rol
      setTimeout(() => {
        const rol = data.usuario.rol;
        if (rol === 'admin') window.location.href = 'dashboard.html';
        else if (rol === 'conductor') window.location.href = 'dashboard_conductor.html';
        else if (rol === 'pasajero') window.location.href = 'dashboard_pasajero.html';
        else window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      showMessage(data.mensaje || 'Error al iniciar sesión', false);
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Error de conexión. Intente nuevamente.', false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Iniciar sesión';
  }
});
