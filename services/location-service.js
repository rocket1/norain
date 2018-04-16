const csv = require('fast-csv');
const geolib = require('geolib');
let cities = require('./city.list');
const where = require('node-where');

// const CIRCLE_RADIUS = 15000; // meterss

class LocationService {

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

        cities.map(loc => {
            loc.coord = {
                longitude: loc.coord.lon,
                latitude: loc.coord.lat
            };
            return loc;
        });

        this._locMap = cities;
    }

    /**
     *
     * @param centerCoord
     * @param radius
     * @returns {*[]}
     */
    getLocationsWithRadius(centerCoord, radius) {
        return this._locMap.filter(loc => {
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
        return new Promise((resolve, reject) => {
            const city = this._locMap.find(city => {
                return city.id === parseInt(id);
            });
            resolve(city);
        });
    }

    /**
     *
     * @param term
     */
    getLocationByTerm(term) {
        return new Promise((resolve, reject) => {

            try {
                where.is(term, (err, result) => {
                    if (result) {
                        result.coord = {
                            latitude: result.attributes.lat,
                            longitude: result.attributes.lng
                        };
                        resolve(result);
                    }
                    else {
                        reject('Location not found.')
                    }
                });
            }
            catch(e) {
                reject(e.message);
            }
        })
    }
}

module.exports = new LocationService();
