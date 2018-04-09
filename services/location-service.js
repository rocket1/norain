const csv = require('fast-csv');
const geolib = require('geolib');
let cities = require('./city.list');

// const CIRCLE_RADIUS = 15000; // meterss

class LocationService {

    // _cityMap;

    /**
     *
     */
    constructor() {
        this._initCities();
    }

    /**
     *
     * @private
     */
    _initCities() {

        cities.map(city => {
            city.coord = {
                longitude: city.coord.lon,
                latitude: city.coord.lat
            };
            return city;
        });

        this._cityMap = cities;
    }

    /**
     *
     * @param centerCoord
     * @param radius
     * @returns {*[]}
     */
    getLocationsWithRadius(centerCoord, radius) {
        return this._cityMap.filter(loc => {
            return geolib.isPointInCircle(
                centerCoord,
                loc.coord,
                radius
            );
        });
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getLocationById(id) {
        const city = this._cityMap.find(city => {
            return city.id === parseInt(id);
        });
        return city;
    }
}

module.exports = new LocationService();
