//Conectando a la API CoinGecko
async function getData() {
  let datos = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&locale=en"
  );
  return await datos.json();
}
// Creando el objeto Coin
class Coin {
  constructor(name, current_price, market_cap, image) {
    (this.name = name), (this.current_price = current_price), (this.market_cap = market_cap),(this.image = image);
  }

  render() {
    let cardCoin = document.createElement("div");
    cardCoin.className = "my-2 mx-auto";
    cardCoin.innerHTML = `

            <div class="card text-white bg-info">
                <div class="card-header text-align-center">${this.name}</div>
                <div class="card-body">
                    <img src="${this.image}" alt="${this.name}">
                    <h4>$${this.current_price.toLocaleString("es-ES")}</h4>
                    <h6>Market Cap: $${this.market_cap.toLocaleString("es-ES")}</h6>
                </div>
            </div>
        
        `;
    document.getElementById("app").append(cardCoin);
  }
}

const coins = getData()
console.log(coins);

async function getCryptos() {
  let cryptos = await coins;
  cryptos.forEach((e) => {
    const newCoin = new Coin(e.name, e.current_price, e.market_cap,e.image);
    newCoin.render();
  });
}

let isSessionOpen = sessionStorage.getItem("token") ?? false;

if (!isSessionOpen) {
  document.getElementById("app").innerHTML = `
  <img src="./assets/icons/notLogin.png" alt="No estas Logueado" class="mx-auto d-block">
  <h3>
Sorry, I would let you see the page, but it seems that you did not <span><a href="./pages/login.html">Login</a> or <a href="./pages/signup.html">Register</a></span></h3>
  `;
  document.body.style = "background-color: white";
} else {
  getCryptos();
  let users = JSON.parse(localStorage.getItem("users"));
  const nowUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const User = users.find(user => user.name == nowUser.name && user.pass == nowUser.pass);
  const currentUser = User
  document.getElementById("navbarNav").innerHTML = `
    <li class="nav-item">
      <a class="nav-link  btn btn-info mx-2" onclick="logOut()">Logout</a>
    </li>
    <li class="nav-item text-center mx-auto"><span>Hola ${currentUser.name}</span></li>  
  `;

  Toastify({
    text: `Bienvenido ${currentUser.name}`,
    duration: 4000,
    position: "center",
    style: {
      background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(13,196,93,1) 35%, rgba(0,212,255,1) 100%)"
    },
  }).showToast()
}

function logOut(){
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("token");
  window.location.reload();
}


//Dom
