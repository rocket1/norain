const express = require('express');
const router = express.Router();
const LocationService = require('../services/location-service');

router.get('/', (req, res, next) => {
    const id = req.query.id;
    const loc = LocationService.getLocationById(id);
    res.send(loc);
});

module.exports = router;
