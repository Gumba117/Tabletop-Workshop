// js/auth.js
/*
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form'); // si lo usas

// Iniciar sesión
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Error al iniciar sesión: ' + error.message);
    } else {
      window.location.href = 'catalog.html';
    }
  });
}

// Cerrar sesión (puedes llamar esto desde un botón)
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'auth.html';
}
  */
// ==============================
// Autenticación con Supabase
// ==============================

// Referencias a los elementos del formulario
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');

// Mostrar mensaje de error o éxito
function showMessage(message, isError = true) {
  if (authMessage) {
    authMessage.textContent = message;
    authMessage.style.color = isError ? 'red' : 'green';
  }
}

// ------------------------------
// Registro de usuario
// ------------------------------
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      showMessage(`Error al registrarse: ${error.message}`);
    } else {
      showMessage('Registro exitoso. Revisa tu correo para confirmar.', false);
      signupForm.reset();
    }
  });
}

// ------------------------------
// Inicio de sesión
// ------------------------------
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showMessage(`Error al iniciar sesión: ${error.message}`);
    } else {
      // Redirige al catálogo después de login
      window.location.href = 'catalog.html';
    }
  });
}

// ------------------------------
// Cierre de sesión
// ------------------------------
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'auth.html';
  });
}

// ------------------------------
// Comprobación de sesión activa
// ------------------------------
async function checkSession(required = false) {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  if (required && !user) {
    window.location.href = 'auth.html';
  }

  return user;
}

/*
En auth.html ya agregamos formularios con los IDs signup-form, login-form y un #logout-btn.

La función checkSession(required) puede ser usada en cualquier página para redirigir si el usuario no está logueado.

// Proteger la vista
checkSession(true).then((user) => {
  // El usuario está autenticado
  console.log("Usuario actual:", user);
});
*/

