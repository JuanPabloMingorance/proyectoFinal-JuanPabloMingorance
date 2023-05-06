const loginForm = document.getElementById("loginForm");



loginForm.addEventListener('submit',e => {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    const pass = document.getElementById("passInput").value;
    const Users = JSON.parse(localStorage.getItem('users')) ?? [];
    const validUser = Users.find(user => user.name == name && user.pass == pass);
    if(!validUser){
        document.getElementById("nameInput").value = "";
        document.getElementById("passInput").value = "";
        Toastify({
            text: "User or Password, (or both) are incorrect!",
            duration: 3500,
            style: {
                background: "#FFD700",
                color: "black"
            }
        }).showToast();
        return false
    }

    let tokenSession = sessionStorage.getItem("token") ?? false;
    tokenSession = true;
    sessionStorage.setItem("token",tokenSession);
    sessionStorage.setItem("currentUser",JSON.stringify(validUser))
    window.location.href = "../index.html"
})