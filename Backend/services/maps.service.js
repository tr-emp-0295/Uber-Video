const axios = require('axios');
const captainModel = require('../models/captain.model');

// Free OpenStreetMap stack: Nominatim (geocoding) + OSRM (routing). No API key needed,
// but Nominatim requires a User-Agent and allows ~1 request/second on the public server.
const nominatim = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: { 'User-Agent': 'uber-video-app/1.0' }
});

module.exports.getAddressCoordinate = async (address) => {
    try {
        const response = await nominatim.get('/search', { params: { q: address, format: 'json', limit: 1 } });
        if (!response.data.length) {
            throw new Error('Unable to fetch coordinates');
        }
        return {
            ltd: parseFloat(response.data[ 0 ].lat),
            lng: parseFloat(response.data[ 0 ].lon)
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        const from = await module.exports.getAddressCoordinate(origin);
        const to = await module.exports.getAddressCoordinate(destination);

        const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.ltd};${to.lng},${to.ltd}?overview=false`;
        const response = await axios.get(url);

        if (response.data.code !== 'Ok' || !response.data.routes.length) {
            throw new Error('No routes found');
        }

        const route = response.data.routes[ 0 ];
        return {
            distance: { value: route.distance },
            duration: { value: route.duration }
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    try {
        const response = await nominatim.get('/search', { params: { q: input, format: 'json', limit: 5 } });
        return response.data.map(place => place.display_name).filter(value => value);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}