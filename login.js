function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(u => u.user === user && u.pass === pass);

    if (!found) {
        alert("Usuario o contraseña incorrectos!!");
        return;
    }

    // guardar sesión
    localStorage.setItem("currentUser", JSON.stringify(found));

    alert("Bienvenido " + user);

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