const express = require('express');
const router = express.Router();
// const { authenticateUser } = require('../middleware/authentication');
const stripeController = require('../controllers/stripeController');

router.post('/stripe', stripeController);

module.exports = router;
