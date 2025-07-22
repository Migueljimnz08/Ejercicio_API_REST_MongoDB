const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    company_Name: { 
        type: String, 
        required: true,
        unique: true 
    },
    CIF: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        require: true
       
    },
    url_web:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, introduce una URL válida"
        }
    }
}

// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

// // Insertar un proveedor
// const p = new Provider({
//     company_Name: "La casa de las flores",
//     CIF: "B2345",
//     address:"Paseo de la Castellana, 56, Salamanca, 28046 Madrid",
//     url_web: "https://www.lacasadelasflores.com",
// });

// const p = new Provider({
//     company_Name: "Teatro Marquina",
//     CIF: "B4023",
//     address: "Calle de Prim 11",
//     url_web:"https://www.tortillasmarquina.com"
// });

// // Guardar en la BBDD
// p.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err))

// // Insertar otro proveedor
// const p2 = new Provider({
//     company_Name: "La casa de las plantas",
//     CIF: "B2346",
//     address:"Paseo de la Castellana, 25, Chamberi, 28046 Madrid",
//     url_web: "https://www.lacasadelasplantas.com",
// });

// Guardar en la BBDD
// p2.save()
// .then((data)=>console.log(data))
 