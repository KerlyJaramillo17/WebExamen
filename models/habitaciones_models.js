const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitacionSchema= new Schema(
    {
        fecha:{ type:String },
        cliente:{ type:String },
        habitacion:{ type:String },
        dias:{ type:String },
        precio:{ type:String },
        porPagar:{ type:String },
        TipoDeError:{ type:String },
    },
    {
        timestamps: { createdAt:true , updatedAt: true }
    }
)

module.exports =  mongoose.model("Habitación", habitacionSchema );