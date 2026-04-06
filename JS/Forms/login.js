let app = document.getElementById("app");

let container = document.createElement("div");
container.className = "flex items-center justify-center min-h-screen";
app.appendChild(container);

let card = document.createElement("div");
card.className = "bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4";
container.appendChild(card);

let title = document.createElement("h2");
title.textContent = "Sign Up";
title.className = "text-xl font-bold text-center";
card.appendChild(title);

let form = document.createElement("form");
form.className = "flex flex-col gap-3";
card.appendChild(form);

let nameInput = document.createElement("input");
nameInput.placeholder = "Name";
nameInput.className = "border p-2 rounded";
form.appendChild(nameInput);

let emailInput = document.createElement("input");
emailInput.type = "email"
emailInput.placeholder = "Email";
emailInput.className = "border p-2 rounded";
emailInput.required = true;
form.appendChild(emailInput);

let passInput = document.createElement("input");
passInput.type = "password";
passInput.placeholder = "Password";
passInput.className = "border p-2 rounded";
passInput.required = true;
passInput.minLength = 8
passInput.pattern = "^(?=.*[^A-Za-z0-9]).{8,}$"
passInput.title = "Password must be at least 8 characters and contain at least one special character"
form.appendChild(passInput);

let confirmInput = document.createElement("input");
confirmInput.type = "password";
confirmInput.placeholder = "Confirm Password";
confirmInput.className = "border p-2 rounded";
confirmInput.required = true;
form.appendChild(confirmInput);

let submitBtn = document.createElement("button");
submitBtn.textContent = "Sign Up";
submitBtn.className = "bg-blue-500 text-white p-2 rounded";
form.appendChild(submitBtn);

let message = document.createElement("p");
message.className = "text-sm text-center";
form.appendChild(message);

let switchText = document.createElement("p");
switchText.className = "text-sm text-center";
card.appendChild(switchText);

let switchLink = document.createElement("a");
switchLink.href = "#";
switchLink.className = "text-blue-500 cursor-pointer";

switchText.appendChild(document.createTextNode("Already have an account? "));
switchText.appendChild(switchLink);

let mode = "signup";

function updateForm() {
    if (mode === "signup") {
        title.textContent = "Sign Up";
        submitBtn.textContent = "Sign Up";
        nameInput.style.display = "block";
        confirmInput.style.display = "block";
        confirmInput.required = true;
        switchText.firstChild.textContent = "Already have an account? ";
        switchLink.textContent = "Sign In";
    };
    if (mode === "signin") {
        title.textContent = "Sign In";
        submitBtn.textContent = "Sign In";
        nameInput.style.display = "none";
        confirmInput.style.display = "none";
        switchText.firstChild.textContent = "Don't have an account? ";
        switchLink.textContent = "Sign Up";
        confirmInput.required = false;
    };
    message.textContent = "";
};

switchLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (mode === "signup") {
        mode = "signin";
    } else {
        mode = "signup";
    };
    updateForm();
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    if (mode === "signup") {
        if (passInput.value !== confirmInput.value) {
            message.textContent = "Passwords do not match";
            message.className = "text-red-500 text-sm text-center";
            return;
        };
        let user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passInput.value
        };
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));
        message.textContent = "Account created";
        message.className = "text-green-600 text-sm text-center";
    };

    if (mode === "signin") {
        let found = users.find(u => u.email === emailInput.value && u.password === passInput.value);
        if (found) {
            message.textContent = "Login successful";
            message.className = "text-green-600 text-sm text-center";
            localStorage.setItem("currentUser", JSON.stringify(found))
            window.location.href = "dashboard.html"
        }
        else {
            message.textContent = "Invalid email or password";
            message.className = "text-red-500 text-sm text-center";
        };
    };
});
updateForm()