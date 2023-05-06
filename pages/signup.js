const signupForm = document.getElementById("registerForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("nameInput").value;
  let pass = document.getElementById("passInput").value;

  const Users = JSON.parse(localStorage.getItem("users")) ?? [];
  const isUserRegistered = Users.find((user) => user.name == name);
  if (isUserRegistered) {
    document.getElementById("nameInput").focus();
    //alert("User exists!")
    document.getElementById("nameInput").value = "";
    document.getElementById("passInput").value = "";
     Toastify({
            text:"User already exists",
            duration: 3300,
            style: {
              background: "#ff3333"
            }
        }).showToast()
    return false;
  }

  Users.push({ name: name, pass: pass, token: false });
  localStorage.setItem("users", JSON.stringify(Users));
  window.location.href = "./login.html";
});
