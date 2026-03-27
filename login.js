function login(){
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorEl = document.getElementById("error");

    // ✅ Replace these with your actual email and password
    const validEmail = "student@example.com";
    const validPass = "1234";

    if(email === validEmail && password === validPass){
        // Save login state
        localStorage.setItem("loggedIn", "true");
        // Redirect to planner
        window.location.href = "planner.html";
    } else {
        errorEl.textContent = "Invalid email or password!";
    }
}

// Prevent accessing planner without login
if(window.location.pathname.includes("planner.html")){
    const loggedIn = localStorage.getItem("loggedIn");
    if(!loggedIn){
        window.location.href = "login.html";
    }
}