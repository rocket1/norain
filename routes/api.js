const express = require('express');
const router = express.Router();
const LocationService = require('../services/location-service');
const WeatherService = require('../services/weather-service');

router.get('/', (req, res, next) => {
    const id = req.query.id;
    const loc = LocationService.getLocationById(id);
    const locs = LocationService.getLocationsWithRadius(loc.coord, 15000);
    const weather = WeatherService.getSunnyLocations(locs).then(sunnyLocs => {
        res.send(sunnyLocs);
    });

});

module.exports = router;
