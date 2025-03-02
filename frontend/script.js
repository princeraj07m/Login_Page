document.getElementById("toggle-btn").addEventListener("click", () => {
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");

    if (formTitle.textContent === "Login") {
        formTitle.textContent = "Sign Up";
        submitBtn.textContent = "Sign Up";
        document.getElementById("toggle-text").innerHTML = "Already have an account? <span id='toggle-btn'>Login</span>";
    } else {
        formTitle.textContent = "Login";
        submitBtn.textContent = "Login";
        document.getElementById("toggle-text").innerHTML = "Don't have an account? <span id='toggle-btn'>Sign Up</span>";
    }
    attachToggleEvent();
});

function attachToggleEvent() {
    document.getElementById("toggle-btn").addEventListener("click", () => {
        const formTitle = document.getElementById("form-title");
        const submitBtn = document.getElementById("submit-btn");

        if (formTitle.textContent === "Login") {
            formTitle.textContent = "Sign Up";
            submitBtn.textContent = "Sign Up";
            document.getElementById("toggle-text").innerHTML = "Already have an account? <span id='toggle-btn'>Login</span>";
        } else {
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            document.getElementById("toggle-text").innerHTML = "Don't have an account? <span id='toggle-btn'>Sign Up</span>";
        }
        attachToggleEvent();
    });
}

document.getElementById("auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formTitle = document.getElementById("form-title").textContent;
    const endpoint = formTitle === "Sign Up" ? "http://localhost:5000/signup" : "http://localhost:5000/login";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        document.getElementById("message").textContent = result.message;
        document.getElementById("message").style.color = result.success ? "green" : "red";

        if (result.success && formTitle === "Login") {
            setTimeout(() => {
                window.location.href = "http://localhost:3000/";
            }, 1000);
        }
    } catch (error) {
        document.getElementById("message").textContent = "Error connecting to server!";
    }
});

attachToggleEvent();
