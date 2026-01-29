import CONFIG from '../config/config.js'

const signUpEmailInput = document.getElementById('signUp-email-input');
const signUppasswordInput = document.getElementById('signUp-password-input');
const signUpButton = document.getElementById('signUp-button');
const messageCont = document.getElementById('message-cont');

signUpButton.addEventListener('click', async () => {
    const email = signUpEmailInput.value.trim();
    const password = signUppasswordInput.value.trim();

    if (!email || !password) {
        messageCont.style.color = "red";
        messageCont.textContent = "Enter email and password both!"
        return;
    }

    try {
        const res = await fetch(`${CONFIG.BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            messageCont.style.color = "green";
            messageCont.textContent = data.msg;
        } else {
            messageCont.style.color = "red";
            messageCont.textContent = data.msg || data.details || data.error || "Signup failed";
        }

    } catch (err) {
        console.error("Error:", err);
        messageCont.style.color = "red";
        messageCont.textContent = "Server error, Please try again later!";
    }
})