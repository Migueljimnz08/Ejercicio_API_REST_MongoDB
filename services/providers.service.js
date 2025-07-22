const Provider = require('../models/providers.model');
const Product = require('../models/products.model');

const getAllProviders = async () => {
    return await Provider.find({}, "-__v");
};

const getProviderByName = async (company_Name) => {
    return await Provider.find({company_Name}, "-__v");
};

const createProvider = async (
    company_Name,
    CIF,
    address,
    url_web
) => {
    const provider = new Provider({
        company_Name,
        CIF,
        address,
        url_web
    });
    return await provider.save();
};

const updateProvider = async (filter, providerData) => {
    const {company_Name, CIF, address, url_web} = providerData;

    return await Provider.findOneAndUpdate({company_Name: filter}, providerData, {new: true});
};

const deleteProvider = async (company_Name) => {
    const provider = await Provider.findOne({ company_Name });
    if(!provider) {
        throw new Error(`No provider found with name: ${company_Name}`);
    }
    const provider_id = provider._id.toString();

    const products = await Product.find({ provider: provider_id });
    if(products.length > 0){
        throw new Error(`Can't delete provider: ${company_Name}, it still has produtcs in the data base`)
    }
    else {
        return await Provider.findOneAndDelete({company_Name});
    }
};

module.exports = {
    getAllProviders,
    getProviderByName,
    createProvider,
    updateProvider,
    deleteProvider
};