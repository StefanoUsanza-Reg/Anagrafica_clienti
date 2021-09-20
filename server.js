const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app= express()

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database NeDB, creazione e caricamento database
var Datastore = require('nedb')
const database = new Datastore('database.db')
database.loadDatabase()
const users = new Datastore('users.db')
users.loadDatabase()


// elenco di tutti i clienti: GET/clienti
app.get("/clienti",(req,res)=>{
    database.find({}, (err, da)=>{
        res.send(da)
    })
})

// elenco clienti con nome uguale a quello richiesto
app.get("/clienti/nome/:regione_sociale",(req,res)=>{
    const {regione_sociale}= req.params
    database.find({regione_sociale: regione_sociale}, (err, da)=>{
        res.send(da)
    })
})

//recupero informazione dei clienti filtrati
//! non usare l'accento
app.get("/clienti/filtra/:localita/:importo_min/:importo_max",(req,res)=>{
    const {localita}= req.params
    const {importo_min}= req.params
    const {importo_max}= req.params
    let min = parseInt(importo_min)
    let max = parseInt(importo_max)

    if(localita==0 && importo_min==0 && importo_max==0){
        //console.log("nessun filtro")
        database.find({}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: max
    else if(localita==0 && importo_min==0 && importo_max!=0){
        database.find({importo: {$lte: max}}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: min
    else if(localita==0 && importo_min!=0 && importo_max==0){
        database.find({importo: {$gte: min}}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: min, max
    else if(localita==0 && importo_min!=0 && importo_max!=0){
        database.find({importo: {$gte: min, $lte: max}}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: località
    else if(localita!=0 && importo_min==0 && importo_max==0){
        database.find({località: localita}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: località,max
    else if(localita!=0 && importo_min==0 && importo_max!=0){
        database.find({località: localita, importo: {$lte: max}}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: località,min
    else if(localita!=0 && importo_min!=0 && importo_max==0){
        database.find({località: localita, importo: {$gte: min}}, (err, da)=>{
            res.send(da)
        })
    }
    //filtri: località,min,max
    else if(localita!=0 && importo_min!=0 && importo_max!=0){
        database.find({località: localita, importo: {$gte: min, $lte: max}}, (err, da)=>{
            res.send(da)
        })
    }

})

// recupeo informazioni di un cliente tramite id: GET/clienti/39
app.get("/clienti/:id",(req,res)=>{
    const {id}= req.params

    database.find({_id: id}, (err, da)=>{
        res.send(da)
    })
})

//aggiungi nuovo cliente
app.post("/clienti/post",(req,res)=>{
    const newCliente = req.body;
    database.insert(newCliente)
})

//elimina un cliente
app.delete("/clienti/:id",(req,res)=>{
    const {id}= req.params
    database.remove({_id: id}, {}, function (err, numRemoved) {
        //console.log("eliminiazione")
        database.loadDatabase()
      })
})

//modifica cliente
app.put("/clienti/:id",(req,res)=>{
    const {id}= req.params
    const update = req.body
    //console.log(update)
    database.update({_id: id}, { $set: update}, {}, function (err, numReplaced) {
        database.loadDatabase()
    })
})

app.listen(3000, ()=>{
    console.log("server listening on port 3000:")
})

// implementazione autenticazione
app.get("/users/:name/:password",(req,res)=>{
    const {name}= req.params
    const {password}= req.params
    users.find({name: name}, (err, da)=>{
        const user = da
        if(user!=""){
            bcrypt.compare(password, user[0].password).then(function(result) {
                if(result)
                    res.send(true)
                else
                    res.send(false)
            });    
        }
        else
            res.send(false)
        
    })
})

/* //aggiungi utenti
app.post("/users", (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(function(hash) {

        const user = {name: req.body.name, password: hash}
        users.insert(user)    
    });
}) */

