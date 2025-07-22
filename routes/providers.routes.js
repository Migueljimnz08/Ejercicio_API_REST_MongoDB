const express = require('express');

const providerController = require('../controllers/providers.controllers');
const router = express.Router();

// GET
router.get('/{:company_Name}', providerController.getProviders);

// POST
router.post('/', providerController.createProviders);

// PUT
router.put('/', providerController.updateProvider);

// DELETE
router.delete('/', providerController.deleteProvider);

module.exports = router;