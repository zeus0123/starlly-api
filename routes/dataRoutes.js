const express = require('express');

const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/data-analysis',dataController.dataAnalysis);
router.get('/get-data',dataController.getData);
router.get('/latest-data',dataController.getLatestRow);
router.get('/parameter-one-data',dataController.getParameterOneData);
router.get('/parameter-two-data',dataController.getParameterTwoData);
router.get('/parameter-three-data',dataController.getParameterThreeData);
router.get('/get-time',dataController.getTime);
router.get('/alert-count',dataController.getAlertCount);
router.get('/last-power-outage',dataController.lastPowerOutage);
router.get('/power-outage-time',dataController.powerOutageTime);



module.exports = router;