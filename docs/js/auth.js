
// ==============================
// Autenticación con Supabase
// ==============================

// Referencias a los elementos del formulario
const authForm = document.getElementById('auth-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const authMessage = document.getElementById('auth-message');

// Mostrar mensaje de error o éxito
function showMessage(message, isError = true) {
  if (authMessage) {
    authMessage.textContent = message;
    authMessage.style.color = isError ? 'red' : 'green';
  }
}

// Login al enviar el formulario (por defecto)
if (authForm && loginBtn) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showMessage(`Error al iniciar sesión: ${error.message}`);
    } else {
      window.location.href = 'catalog.html';
    }
  });
}

// Registro al hacer click en el botón de registro
if (authForm && signupBtn) {
  signupBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      showMessage(`Error al registrarse: ${error.message}`);
    } else {
      showMessage('Registro exitoso. Revisa tu correo para confirmar.', false);
      authForm.reset();
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

