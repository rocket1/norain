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
     * @param locs
     * @returns {PromiseLike<T> | Promise<T>}
     */
    getSunnyLocations(locs) {
        return this._getWeatherPromiseForLocations(locs).then(results => {
            results = results
                .map(resultRaw => {
                    return JSON.parse(resultRaw);
                })
                .filter(result => {
                    const excludeTypes = ['rain', 'snow'];
                    let shouldInclude = true;
                    for (let i = 0, len = excludeTypes.length; i < len; ++i) {
                        if (excludeTypes[i] in result) {
                            shouldInclude = false;
                            break;
                        }
                    }
                    return shouldInclude;
                });

            results.sort((a, b) => {

                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase

                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });

            return results;

        });
    }
}

module.exports = new WeatherService();
