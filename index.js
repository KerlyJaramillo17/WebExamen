
// Librerias de terceros 
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const cron = require("node-cron");
const axios = require("axios").default;
const express = require("express")
const cors = require("cors");
// Libresias propias 
const { MONGO_URI } = require("./config");
const { Habitación } = require("./models");
let { guardarreserva, habitacionesController } = require("./controllers");

// 
const app = express();


//midelware
app.use(cors()).use(express.json())
//conexion a la base de datos
mongoose.connect(MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true }, 
    (err, res) => {
        if (err) return console.log("Hubo un error en la base de datos ", err);
        console.log("Conexión con la base de datos en mongooDB establecida");
    }
    );
    // se guardan los datos en la base de datos 
    async function cargarVariables() {
        guardarreserva = await require('./controllers/habitaciones').guardarreserva() ;            
        return guardarreserva;
    }

    

// metodo post que almacena la informacion 
app.post('/', (req,res)=>{    
    cargarVariables();
    res.status(200).send({
        mensaje:"El elemento se almaceno correctamente",
        respuesta: body
    });
})