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

const id = document.getElementById("id")
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
const btnUpdate = document.getElementById("update")
const user = document.getElementById("user")
const btnLogout = document.getElementById("logout")
const btnSearch = document.getElementById("search")

//inserisci i dati nei campi
function inserisci(data){
    id.value = data[0]._id
    name.value = data[0].regione_sociale
    indirizzo.value = data[0].indirizzo
    cap.value = data[0].cap
    località.value = data[0].località
    provincia.value = data[0].provincia
    nazionalità.value = data[0].nazionalità
    cod_fiscale.value = data[0].cod_fiscale
    data_nascita.value = data[0].data_nascita
    tel.value = data[0].tel
    email.value = data[0].email
    importo.value = data[0].importo
    note.value = data[0].note

}

//ricerca cliente tramite nome
btnSearch.onclick = () => {
    localStorage.setItem('input', input.value);
  }

//aggiorna le informazioni del cliente con l'id inserito
btnUpdate.onclick = () =>{
     //? PUT/clienti/:id
  fetch('http://localhost:3000/clienti/' + id.value, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({regione_sociale: name.value, indirizzo: indirizzo.value, cap: cap.value, località: località.value, 
        provincia: provincia.value, nazionalità: nazionalità.value, codice_fiscale: cod_fiscale.value,
        data_nascita: data_nascita.value, telefono: tel.value, email: email.value, importo: parseInt(importo.value), note: note.value}),
  }) 
}
//inserisci i dati nei campi
if(localStorage.getItem('id')!=""){
    fetch('http://localhost:3000/clienti/'+ localStorage.getItem('id'))
    .then(response => response.json())
    .then(data => {
        localStorage.clear()
        inserisci(data)
        });    
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


