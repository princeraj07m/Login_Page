function updateToggleText(isLogin) {
    const toggleText = isLogin
        ? "Don't have an account? <span id='toggle-btn'>Sign Up</span>"
        : "Already have an account? <span id='toggle-btn'>Login</span>";
    document.getElementById("toggle-text").innerHTML = toggleText;
    attachToggleEvent(); // Re-attach event because innerHTML removes the original event listener
}

function attachToggleEvent() {
    document.getElementById("toggle-btn").addEventListener("click", () => {
        const formTitle = document.getElementById("form-title");
        const submitBtn = document.getElementById("submit-btn");

        const isLogin = formTitle.textContent.trim() === "Login";
        formTitle.textContent = isLogin ? "Sign Up" : "Login";
        submitBtn.textContent = isLogin ? "Sign Up" : "Login";
        updateToggleText(!isLogin);
    });
}

document.getElementById("auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const formTitle = document.getElementById("form-title").textContent.trim();
    const endpoint = formTitle === "Sign Up"
        ? "http://localhost:5000/signup"
        : "http://localhost:5000/login";

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
                // add your link here 😉
                window.location.href = "https://www.youtube.com/";
            }, 500);
        }
    } catch (error) {
        document.getElementById("message").textContent = "Error connecting to server!";
        document.getElementById("message").style.color = "red";
    }
});

attachToggleEvent();
