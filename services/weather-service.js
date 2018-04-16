const curl = require('curl');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=c1ad69b1ee7c383058585d0386a03992';

class WeatherService {

    /**
     *
     * @param id
     * @returns {Promise<any>}
     * @private
     */
    _getWeatherPromise(id) {

        return new Promise((resolve, reject) => {

            const url = `${API_URL}&id=${id}`;

            curl.get(
                url,
                {},
                (err, response, body) => {
                    resolve(body);
                }
            );
        });
    }

    /**
     *
     * @param locs
     */
    _getWeatherPromiseForLocations(locs) {

        let promises = [];

        for (let i = 0, len = locs.length; i < len; ++i) {
            const cityId = locs[i].id;
            const promise = this._getWeatherPromise(cityId);
            promises.push(promise);
        }

        return Promise.all(promises);
    }

    /**
     *
     * @param result
     * @returns {boolean}
     * @private
     */
    _isSunny(result) {
        // see: https://openweathermap.org/weather-conditions
        const weather = result.weather[0];
        const weatherId = weather.id;
        return weatherId >= 800 && weatherId < 900;
    }

    /**
     *
     * @param locs
     * @returns {PromiseLike<T> | Promise<T>}
     */
    getSunnyLocations(locs) {
        return this._getWeatherPromiseForLocations(locs).then(results => {
            results = results
                .map(JSON.parse)
                .filter(this._isSunny)
                .map(result => {
                    result['coord'] = {
                        latitude: result.coord.lat,
                        longitude: result.coord.lon,
                    };
                    return result;
                });

            return results;
        });
    }
}

module.exports = new WeatherService();
