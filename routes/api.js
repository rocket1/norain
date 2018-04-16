const express = require('express');
const router = express.Router();
const LocationService = require('../services/location-service');
const WeatherService = require('../services/weather-service');
const cors = require('cors');

/**
 *
 * @param query
 * @returns {*}
 */
function getLocationPromiseFromQuery(query) {

    if ('id' in query) {
        return LocationService.getLocationById(query.id);
    }
    else if ('term' in query) {
        return LocationService.getLocationByTerm(query.term);
    }

    throw new Error('Insufficient query parameters.');
}

router.get('/', cors(), (req, res, next) => {

    const defaultRadiusInMeters = 15000;
    const radius = 'radius' in req.query ? req.query.radius * 1000 : defaultRadiusInMeters;

    getLocationPromiseFromQuery(req.query).then(loc => {

        const locs = LocationService.getLocationsWithRadius(loc.coord, radius);
        const weather = WeatherService.getSunnyLocations(locs).then(sunnyLocs => {

            sunnyLocs.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            if ('pretty' in req.query) {
                sunnyLocs = sunnyLocs.map(loc => `<b>${loc.name}</b>`).join('<br>');
                res.send(sunnyLocs);
            }
            else {
                res.send({
                    location: loc,
                    nearbyLocations: sunnyLocs
                });
            }
        });
    }).catch(reason => {
        res.send({
            error: reason
        });
    });

});

module.exports = router;
