const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

const getAllProducts = async () => {
        return await Product.find({}, "-__v").populate("provider", "-__v");
}
    

const getProductsByTitle = async (title) => {
    return await Product.find({ title }, "-__v").populate("provider", "-__v");
};

const createProduct = async (
    title,
    price,
    description,
    company_Name
) => {
    const provider = await Provider.find({ company_Name });
    const provider_id = provider[0]._id.toString();
    
    const product = new Product({
        title,
        price,
        description,
        provider: provider_id
    });
    return await product.save();
};

const updateProduct = async (filter, productData) => {
    const {title, price, description, company_Name} = productData;  

    const provider = await Provider.findOne({ company_Name });
     if (!provider) {
        throw new Error(`Couldn't find the provider with the name: ${company_Name}`);
    }
    const provider_id = provider._id.toString();

    const updatedData = {
        title,
        price,
        description,
        provider: provider_id
    };
    return await Product.findOneAndUpdate( {title: filter}, updatedData, {new: true});
};

const deleteProduct = async (title) => {
    return await Product.findOneAndDelete({ title });
};

module.exports = {
    getAllProducts,
    getProductsByTitle,
    createProduct,
    updateProduct,
    deleteProduct
}


// createProduct(
// 	"Tortilla - Marquina",
// 	1.80,
//     "La mejor tortilla de la zona en el Teatro Marquina",
// 	"Teatro Marquina"    
// )

// createProduct(
// 	"Ensalada de tomate",
//     2.5,
//     "Ensalada fresca de la huerta",
// 	"La casa de las plantas"    
// )

// createProduct(
// 	"Ramo de rosas",
// 	12,
//     "Ramo hecho a mano",
// 	"La casa de las flores"    
// )
