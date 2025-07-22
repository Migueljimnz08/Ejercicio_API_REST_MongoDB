const { response } = require('express');
const productsService = require('../services/products.service');

// GET
const getProducts = async (req, res) => {
    let products;
    try{
        if(req.query.title){
            products = await productsService.getProductsByTitle(req.query.title);
        }
        else {
            products = await productsService.getAllProducts();
        }
        if (!products){
            return res.status(404).json({ message: 'Product not found'});
        }
    res.status(200).json(products);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

// POST 
const createProduct = async (req, res) => {
    try {
        const { title, price, description, company_Name } = req.body;
        if (!title || !price || !description || !company_Name) {
            res.status(400).json({ msj: "Missing necessary data" });
    }
    let newProduct = await productsService.createProduct(
      title,
      price,
      description,
      company_Name
    );
    res.status(201).json({
            msj: "Product saved",
            data: newProduct 
        });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
};

// PUT
const updateProduct = async (req, res) => {
    try {
        const {filter, title, price, description, company_Name} = req.body;
        if (!filter || !title || !price || !description || !company_Name) {
            res.status(400).json({ msj: "Missing necessary data" });
    }
    let productData = {title, price, description, company_Name};
    let updatedProduct = await productsService.updateProduct(filter, productData);
     res.status(200).json({
            msj: "Product updated",
            Oldproduct: filter,
            data: updatedProduct 
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const {title} = req.body;
        if(!title){
            res.status(400).json({ msj: "Missing valid title"});      
        }
        const deleted = await productsService.deleteProduct(title);
        if(!deleted){
            res.status(400).json({ msj: "Couldn't find a product with the given title"});
        }
        res.status(200).json({ msj: `Product: ${title} was successfully deleted`})
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}