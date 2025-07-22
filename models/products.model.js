const mongoose = require("mongoose");
const Provider = require("./providers.model");
require("../config/db_mongo"); // Conexión a BBDD MongoDB

const objectSchema = {
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

module.exports = Product;



