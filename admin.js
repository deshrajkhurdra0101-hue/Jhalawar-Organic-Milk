/* =========================================================
   JHALAWAR ORGANIC MILK
   ADMIN LOGIN
========================================================= */

const loginForm = document.getElementById("admin-login-form");
const loginError = document.getElementById("login-error");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const username =
            document.getElementById("admin-email").value.trim();

        const password =
            document.getElementById("admin-password").value.trim();


        /* -----------------------------------------
           TEMPORARY DEMO LOGIN

           Real secure authentication will be added
           later using backend authentication.
        ----------------------------------------- */

        const demoUsername = "admin";
        const demoPassword = "123456";


        if (
            username === demoUsername &&
            password === demoPassword
        ) {

            loginError.textContent = "";


            /*
               Save temporary login session
            */

            sessionStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            /*
               Redirect to admin dashboard
            */

            window.location.href =
                "admin-dashboard.html";

        } else {

            loginError.textContent =
                "Invalid username or password.";

        }

    });

}