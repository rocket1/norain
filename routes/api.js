const express = require('express');
const router = express.Router();
const LocationService = require('../services/location-service');
const WeatherService = require('../services/weather-service');

router.get('/', (req, res, next) => {

    const id = req.query.id;
    const radius = 'radius' in req.query ? req.query.radius * 1000 : 15000;
    const loc = LocationService.getLocationById(id);
    const locs = LocationService.getLocationsWithRadius(loc.coord, radius);

    const weather = WeatherService.getSunnyLocations(locs).then(sunnyLocs => {

        if ('pretty' in req.query) {
            sunnyLocs = sunnyLocs.map(loc => `<b>${loc.name}</b> (${loc.weather[0].main})`).join('<br>');
        }

        res.send(sunnyLocs);
    });

});

module.exports = router;
