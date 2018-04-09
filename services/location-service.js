const csv = require('fast-csv');

// geonameid         : integer id of record in geonames database
const GEONAMEID_NDX = 0;
// name              : name of geographical point (utf8) varchar(200)
const NAME_NDX = 1;
// asciiname         : name of geographical point in plain ascii characters, varchar(200)
// alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
// latitude          : latitude in decimal degrees (wgs84)
const LAT_NDX = 4;
// longitude         : longitude in decimal degrees (wgs84)
const LNG_NDX = 5;
// feature class     : see http://www.geonames.org/export/codes.html, char(1)
//     feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
//     country code      : ISO-3166 2-letter country code, 2 characters
// cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
// admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
// admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80)
// admin3 code       : code for third level administrative division, varchar(20)
// admin4 code       : code for fourth level administrative division, varchar(20)
// population        : bigint (8 byte int)
// elevation         : in meters, integer
// dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
//     timezone          : the iana timezone id (see file timeZone.txt) varchar(40)
// modification date : date of last modification in yyyy-MM-dd format

class LocationService {

    constructor() {
        this._initCities();
    }

    _initCities() {

        this._cityMap = {};

        csv.fromPath('cities15000.txt', {delimiter: '\t'})
            .on('data', (data) => {
                
                const id = data[GEONAMEID_NDX];
                const name = data[NAME_NDX];
                const lat = data[LAT_NDX];
                const lng = data[LNG_NDX];
                
                this._cityMap[id] = {
                    name: name,
                    coord: {
                        lat: lat,
                        lng: lng
                    }
                }
            })
            .on('end', () => {
                console.log('done');
            });
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getLocationById(id) {
        const city = this._cityMap[id];
        return city;
    }
}

module.exports = new LocationService();
