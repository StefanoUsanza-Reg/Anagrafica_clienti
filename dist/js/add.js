window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault();
  document.body.classList.toggle('sb-sidenav-toggled');
  localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
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

//! ----------------------------------------------

const btnAdd = document.getElementById("add")
const btnSearch = document.getElementById("search")
const input = document.getElementById("input")
const user = document.getElementById("user")
const btnLogout = document.getElementById("logout")

btnSearch.onclick = () => {
  localStorage.setItem('input', input.value);
}

btnAdd.onclick = () => {
  //console.log("ready")
  const name = document.getElementById("name")
  const indirizzo = document.getElementById("indirizzo")
  const cap = document.getElementById("cap")
  const località = document.getElementById("località")
  const provincia = document.getElementById("provincia")
  const nazionalità = document.getElementById("nazionalità")
  const cod_fiscale = document.getElementById("cod_fiscale")
  const data_nascita = document.getElementById("data_nascita")
  const tel = document.getElementById("tel")
  const email = document.getElementById("email")
  const importo = document.getElementById("importo")
  const note = document.getElementById("note")

  if(name.value!="" && importo!=""){
    //? POST/clienti
    fetch('http://localhost:3000/clienti/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({regione_sociale: name.value, indirizzo: indirizzo.value, cap: cap.value, località: località.value, 
          provincia: provincia.value, nazionalità: nazionalità.value, codice_fiscale: cod_fiscale.value,
          data_nascita: data_nascita.value, telefono: tel.value, email: email.value, importo: parseInt(importo.value), note: note.value}),
    })    
  }
  else{
    //inserisci i campi obbligatori
  }

}

btnLogout.onclick = ()=>{
  sessionStorage.clear()
}

// controllo autenticazione
if(sessionStorage.getItem("user")==null){
  window.location.replace("http://localhost:5501/dist/login.html");
}
user.innerHTML = "user: "+ sessionStorage.getItem("user")