const express = require('express');

const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/data-analysis',dataController.dataAnalysis);
router.get('/get-data',dataController.getData);
router.get('/latest-data',dataController.getLatestRow);

module.exports = router;