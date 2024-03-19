# Jakea

Jakea is a Node.js module for calculating solar-related parameters based on geographic location and time.

## Installation

You can install this module via npm: `npm install jakea`

## Usage
```javascript
const solarCalc = require('solarcalc');

const latitude = 37.7749; // Example latitude (San Francisco)
const longitude = -122.4194; // Example longitude (San Francisco)
const date = new Date(); // Current date
const zenith = 90.83; // Default zenith angle for solar elevation calculation

solarCalc.calculateSolarElevation(latitude, longitude, date, zenith)
    .then(solarElevation => {
        console.log('Solar Elevation:', solarElevation);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

