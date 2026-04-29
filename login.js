function showAlert(message, type = "success") {
    const container = document.getElementById("alertContainer");

    if (!container) {
        console.error("No existe alertContainer");
        return;
    }

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
    <sl-alert variant="${type}" closable duration="3000">
        <sl-icon slot="icon" name="info-circle"></sl-icon>
        ${message}
    </sl-alert>
    `;

    const alert = wrapper.firstElementChild;
    container.appendChild(alert);

    // Espera a que el componente esté listo
    setTimeout(() => {
        alert.toast();
    }, 50);
}


function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(u => u.user === user && u.pass === pass);

    if (!found) {
        showAlert("Usuario o contraseña incorrectos!!", "danger");
        return;
    }

    // guardar sesión
    localStorage.setItem("currentUser", JSON.stringify(found));

    showAlert("Bienvenido " + user, "success");

    // redirigir DESPUÉS del alert
    setTimeout(() => {
        window.location.href = "index.html";
    }, 300);
}

function register() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.user === user)) {
        alert("Este usuario ya existe!!");
        return;
    }

    const newUser = {
        user: user,
        pass: pass,
        tasks: []
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    //guardar sesión automáticamente
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Usuario creado correctamente");

    // redirigir directo a la app
    setTimeout(() => {
        window.location.href = "index.html";
    }, 300);
}