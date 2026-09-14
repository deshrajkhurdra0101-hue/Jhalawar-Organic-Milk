/* =========================================================
   JHALAWAR ORGANIC MILK
   ADMIN LOGIN - SUPABASE AUTH
========================================================= */

const loginForm = document.getElementById("admin-login-form");
const loginError = document.getElementById("login-error");


// ---------------------------------------------------------
// SUPABASE CLIENT
// ---------------------------------------------------------

const supabaseClient = window.supabase.createClient(
    businessConfig.supabase.url,
    businessConfig.supabase.key
);


// ---------------------------------------------------------
// ADMIN LOGIN
// ---------------------------------------------------------

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        loginError.textContent = "";


        const email =
            document.getElementById("admin-email").value.trim();

        const password =
            document.getElementById("admin-password").value;


        if (!email || !password) {

            loginError.textContent =
                "Please enter email and password.";

            return;
        }


        const loginButton =
            loginForm.querySelector(".login-button");


        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";


        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error("Login error:", error);

                loginError.textContent =
                    "Invalid email or password.";

                loginButton.disabled = false;
                loginButton.textContent = "Login";

                return;
            }


            if (data && data.user) {

                window.location.href =
                    "admin-dashboard.html";

            } else {

                loginError.textContent =
                    "Login failed. Please try again.";

                loginButton.disabled = false;
                loginButton.textContent = "Login";

            }

        } catch (error) {

            console.error("Unexpected login error:", error);

            loginError.textContent =
                "Something went wrong. Please try again.";

            loginButton.disabled = false;
            loginButton.textContent = "Login";

        }

    });

}