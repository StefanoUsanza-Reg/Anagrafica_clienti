window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

//! -----------------------------------------------

const btnLista = document.getElementById("lista")
const btnCliente = document.getElementById("cliente")
const btnAdd = document.getElementById("add")
const btnDelete = document.getElementById("delete")
const btnModifica = document.getElementById("modifica")
const btnSearch = document.getElementById("search")
const input = document.getElementById("input")
const n_clienti = document.getElementById("n_clienti")
const user = document.getElementById("user")
const btnLogout = document.getElementById("logout")

//ricerca cliente tramite nome
btnSearch.onclick = () => {
  localStorage.setItem('input', input.value);
}

//effettua il logout
btnLogout.onclick = ()=>{
  sessionStorage.clear()
}

// controllo autenticazione
if(sessionStorage.getItem("user")==null){
  window.location.replace("http://localhost:5501/dist/login.html");
}
user.innerHTML = "user: "+ sessionStorage.getItem("user") 

//visualizza numero clienti iscritti
fetch('http://localhost:3000/clienti')
.then(response => response.json())
  .then(data => n_clienti.innerHTML = data.length);