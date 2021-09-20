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

//! -----------------------------------------------

const btnFiltro = document.getElementById("filtro")
const tabella = document.getElementById("tabella")
let tabella1= document.createElement("tbody")
const btnSearch = document.getElementById("search")
const input = document.getElementById("input")
const user = document.getElementById("user")
const btnLogout = document.getElementById("logout")

//ricerca cliente tramite nome
btnSearch.onclick = () => {
  localStorage.setItem('input', input.value);
}

//visualizza i dati dei clienti in una tabella
function visualizza(data){
    let temp=""
    tabella1.innerHTML = temp
    tabella.appendChild(tabella1)  

    if(data!=""){
        temp = "<tr> <td>" + data[0]._id + "</td> <td>" + data[0].regione_sociale +"</td> <td>" + data[0].indirizzo + "</td> <td>" + data[0].cap
        + "</td> <td>" + data[0].località + "</td> <td>" + data[0].provincia + "</td> <td>" + data[0].nazionalità
        + "</td> <td>" + data[0].codice_fiscale + "</td> <td>" + data[0].data_nascita + "</td> <td>" + data[0].telefono + "</td> <td>" + data[0].email
        + "</td> <td>" + data[0].importo + "</td> <td>" + data[0].note +"</td></tr>"
        
        for(let i=1; i<data.length; i++){
            temp += "<tr><td>"+ data[i]._id + "</td> <td>" + data[i].regione_sociale +"</td> <td>" + data[i].indirizzo + "</td> <td>" + data[i].cap
            + "</td> <td>" + data[i].località + "</td> <td>" + data[i].provincia + "</td> <td>" + data[i].nazionalità
            + "</td> <td>" + data[i].codice_fiscale + "</td> <td>" + data[i].data_nascita + "</td> <td>" + data[i].telefono + "</td> <td>" + data[i].email
            + "</td> <td>" + data[i].importo + "</td> <td>" + data[i].note +"</td></tr>"
        }
        tabella1.innerHTML = temp
        tabella.appendChild(tabella1)      
        temp=""
    }

}

//ricerca di tutti i clienti nel database
fetch('http://localhost:3000/clienti')
.then(response => response.json())
  .then(data => {
      visualizza(data)
    });
    //filtra
    btnFiltro.onclick = () => {
        const località = document.getElementById("località")
        const importo_min = document.getElementById("importo_min")
        const importo_max = document.getElementById("importo_max")
        if(località.value=="")
            località.value=0
        if(importo_min.value=="")
        importo_min.value=0
        if(importo_max.value=="")
        importo_max.value=0
        //ricerca clienti che soddisfano i filtri selezionati
        fetch("http://localhost:3000/clienti/filtra/"+ località.value +"/" + importo_min.value + "/" + importo_max.value)
        .then(response => response.json())
        .then(data => {
            visualizza(data)
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