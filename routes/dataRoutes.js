const express = require('express');

const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/data-analysis',dataController.dataAnalysis);

module.exports = router;