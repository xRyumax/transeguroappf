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
const validateForm = (nombre, correo, password, confirmPassword) => {
  if (!nombre || !correo || !password || !confirmPassword) {
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
  if (password !== confirmPassword) {
    showMessage('Las contraseñas no coinciden', false);
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

// Toggle para mostrar/ocultar confirmación de contraseña
document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const icon = this.querySelector('i');
  
  if (confirmPasswordInput.type === 'password') {
    confirmPasswordInput.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    confirmPasswordInput.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
});

// Manejo del formulario
document.getElementById('formRegister').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const submitBtn = this.querySelector('button[type="submit"]');

  if (!validateForm(nombre, correo, password, confirmPassword)) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <i class="fas fa-spinner fa-spin mr-2"></i> Registrando...
  `;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, password })
    });

    const data = await res.json();

    if (res.ok && data.usuario) {
      showMessage('Registro exitoso. Redirigiendo...', true);
      
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      showMessage(data.mensaje || 'Error al registrar usuario', false);
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Error de conexión. Intente nuevamente.', false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Registrarse';
  }
});
