const axios = require('axios');
const moment = require('moment');

/**
 * Calculates solar elevation angle.
 * @param {number} latitude - Latitude in degrees.
 * @param {number} longitude - Longitude in degrees.
 * @param {Date|string} date - Date object or string in YYYY-MM-DD format.
 * @param {number} zenith - Zenith angle in degrees.
 * @returns {Promise<number>} - Promise resolving to solar elevation angle in degrees.
 */
async function calculateSolarElevation(latitude, longitude, date, zenith) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}&formatted=0`;

    try {
        const response = await axios.get(apiUrl);
        const solarData = response.data.results;
        const sunrise = moment(solarData.sunrise);
        const sunset = moment(solarData.sunset);
        const solarNoon = moment(solarData.solar_noon);

        const timeDiffSunrise = moment.duration(moment(sunrise).diff(solarNoon));
        const timeDiffSunset = moment.duration(moment(sunset).diff(solarNoon));

        const solarElevation = zenith - Math.abs(timeDiffSunrise.asMinutes()) / 4;

        return solarElevation;
    } catch (error) {
        throw new Error('Failed to fetch solar data');
    }
}

module.exports = {
    calculateSolarElevation
};
