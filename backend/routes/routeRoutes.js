const express = require('express');
const { getOptimizedRoute } = require('../controllers/routeController');

const router = express.Router();

router.post('/optimize', getOptimizedRoute);

module.exports = router;
