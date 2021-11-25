const mongoose = require("mongoose");
const cheerio = require("cheerio");
const cron = require("node-cron");
const axios = require("axios").default;
const express = require("express")
const cors = require("cors");
// Libresias propias 
const { MONGO_URI } = require("../config");
const { Habitacion } = require("../models");






//conexion a la base de datos
mongoose.connect(MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true }, 
    (err, res) => {
        if (err) return console.log("Hubo un error en la base de datos ", err);
        console.log("Conexión con la base de datos en mongooDB establecida");
    }
    );

//que se ejecute como un cronjob

function guardarreserva(){
cron.schedule("2 * * * *",//se repite cada 2 minutos
async () =>{

    //conectarnos a la pAgina web que vamos a hacer web scrapping
    //Obtenemos todo el HTML
    const html = await  axios.get("https://kerlyjaramillo17.github.io/WebExamen/") ;

    const $ = cheerio.load(html.data);

    const titulos=  $(".tabla_datos");

    let reservaHabitacion=[];
    //filtrar las noticias
    titulos.each((index, element)=>{
        //almacenar la informaciOn
        const habitaciones = {
            
                fecha:          $(element).children('.dato_1').text().toString(),
                cliente:        $(element).children('.dato_2').text().toString(),
                habitacion:     $(element).children('.dato_3').text().toString(),
                dias:           $(element).children('.dato_4').text().toString(),
                precio:         $(element).children('.dato_5').text().toString(),
                porPagar:       $(element).children('.dato_6').text().toString(),
                 
        }
        reservaHabitacion= [...reservaHabitacion, habitaciones];
    }) 
    console.log(reservaHabitacion)
    habitacion.create(reservaHabitacion);
});
}
module.exports = {
    guardarreserva,


}