const { response } = require('express');
const providerServices = require('../services/providers.service');

// GET 
const getProviders = async (req, res) => {
    let providers;
    try {
        if(req.query.company_Name){
            providers = await providerServices.getProviderByName(req.query.company_Name);
        }
        else{
            providers = await providerServices.getAllProviders();
        }
        if (!providers){
            return res.status(404).json({ message: 'Providers not found'});
        }
    res.status(200).json(providers);
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
};

// POST
const createProviders = async (req, res) => {
    try{
        const { company_Name, CIF, address, url_web  } = req.body;
        if (!company_Name || !CIF || !address || !url_web) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
        let newProvider = await providerServices.createProvider(
              company_Name,
              CIF,
              address,
              url_web
            );
            res.status(201).json({
                    msj: "Provider saved",
                    data: newProvider 
                });
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}`});
    }
};

// PUT
const updateProvider = async (req, res) => {
    try{
        const {filter, company_Name, CIF, address, url_web} = req.body;
        if (!filter || !company_Name || !CIF || !address || !url_web) {
            res.status(400).json({ msj: "Missing necessary data" });
        }
        const providerData = {company_Name, CIF, address, url_web};
        const updatedProvider = await providerServices.updateProvider(filter, providerData);
        res.status(200).json({
            msj: "Provider updated",
            Oldprovider: filter,
            data: updatedProvider 
        });
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

// DELETE
const deleteProvider = async (req, res) => {
    try{
        const {company_Name} = req.body;
            if(!company_Name){
                res.status(400).json({ msj: "Missing valid name"});      
            }
            const deleted = await providerServices.deleteProvider(company_Name);
            if(!deleted){
                res.status(400).json({ msj: "Couldn't find a provider with the given name"});
            }
            res.status(200).json({ msj: `Provider: ${company_Name} was successfully deleted`})
    } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(500).json({ msj: `ERROR: ${error.stack}`});
  }
}

module.exports = {
    getProviders,
    createProviders,
    updateProvider,
    deleteProvider
}