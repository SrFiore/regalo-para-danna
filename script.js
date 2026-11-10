
"use strict";

// ==========================================
// CREDENCIALES AUTORIZADAS
// ==========================================
// Puedes añadir tantas personas como quieras.
// El usuario no distingue entre mayúsculas y minúsculas.
// La contraseña sí distingue entre mayúsculas y minúsculas.

const VALID_CREDENTIALS = [
    {
        username: "danna",
        password: "fresa123"
    },
    {
        username: "familia",
        password: "fresa123"
    },
    {
        username: "amigos",
        password: "fresa123"
    }
];

// ==========================================
// ELEMENTOS DEL LOGIN
// ==========================================

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const submitButton = document.getElementById("btn-entrar");
const formMessage = document.getElementById("form-message");
const loginCard = document.querySelector(".login-card");

// ==========================================
// AUTENTICACIÓN
// ==========================================

async function authenticateUser(username, password) {
    const normalizedUsername = username.trim().toLowerCase();

    return VALID_CREDENTIALS.some(account =>
        account.username.toLowerCase() === normalizedUsername &&
        account.password === password
    );
}

// ==========================================
// MENSAJES Y ESTADO DEL BOTÓN
// ==========================================


// ==========================================
// MENSAJES Y ESTADO DEL BOTÓN
// ==========================================

function showMessage(message, type = "error") {
    formMessage.textContent = message;
    formMessage.classList.toggle("is-success", type === "success");
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.setAttribute("aria-busy", String(isLoading));

    const label = submitButton.querySelector(".button-label");

    label.textContent = isLoading
        ? "Comprobando acceso…"
        : "Entrar a mi regalo";
}

// ==========================================
// TRANSICIÓN HACIA LA PÁGINA PRINCIPAL
// ==========================================

function transitionToGift() {
    document.body.classList.add("is-transitioning");

    // Crear pétalos de cerezo.
    for (let i = 0; i < 13; i++) {
        const petal = document.createElement("span");

        petal.className = "transition-petal";

        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDelay = `${Math.random() * 0.8}s`;
        petal.style.animationDuration = `${1.8 + Math.random() * 0.8}s`;

        petal.style.setProperty(
            "--drift",
            `${Math.random() * 150 - 75}px`
        );

        petal.style.setProperty(
            "--rotation",
            `${Math.random() * 500 + 180}deg`
        );

        document.body.appendChild(petal);
    }

    // Esperar a que termine la transición.
    setTimeout(() => {
        window.location.assign("principal.html");
    }, 1800);
}

// ==========================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ==========================================

togglePassword.addEventListener("click", () => {
    const willShow = passwordInput.type === "password";

    passwordInput.type = willShow ? "text" : "password";
    togglePassword.classList.toggle("is-visible", willShow);
    togglePassword.setAttribute("aria-pressed", String(willShow));

    const actionLabel = willShow
        ? "Ocultar contraseña"
        : "Mostrar contraseña";

    togglePassword.setAttribute("aria-label", actionLabel);
    togglePassword.setAttribute("title", actionLabel);
});

// ==========================================
// LIMPIAR MENSAJES AL ESCRIBIR
// ==========================================

[usernameInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => {
        if (formMessage.textContent) {
            showMessage("");
        }
    });
});

// ==========================================
// ENVÍO DEL FORMULARIO
// ==========================================

loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    showMessage("");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showMessage(
            "Completa tu usuario y tu contraseña para continuar."
        );

        (!username ? usernameInput : passwordInput).focus();
        return;
    }

    setLoading(true);

    try {
        const authenticated = await authenticateUser(
            username,
            password
        );

        if (!authenticated) {
            showMessage(
                "No pudimos validar esos datos. Revísalos e inténtalo de nuevo."
            );

            loginCard.classList.remove("is-shaking");
            void loginCard.offsetWidth;
            loginCard.classList.add("is-shaking");

            return;
        }

        showMessage(
            "Acceso correcto. Abriendo tu regalo…",
            "success"
        );

       transitionToGift();

    } catch (error) {
        showMessage(
            "No fue posible comprobar el acceso. Inténtalo de nuevo."
        );

        console.error("Error de autenticación:", error);

    } finally {
        setLoading(false);
    }
});
