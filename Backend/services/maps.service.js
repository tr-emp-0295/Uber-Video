const axios = require('axios');
const captainModel = require('../models/captain.model');

// Free OpenStreetMap stack: Photon (geocoding / autocomplete) + OSRM (routing). No API key needed.
// Public servers are fair-use, so requests are queued and results cached.
const MIN_GAP_MS = 400;
const cache = new Map();
const coordinatesByLabel = new Map();
let queue = Promise.resolve();

const photonSearch = (q, limit) => {
    const key = `${limit}:${q.toLowerCase()}`;
    if (cache.has(key)) {
        return Promise.resolve(cache.get(key));
    }

    const result = queue.then(async () => {
        if (cache.has(key)) {
            return cache.get(key);
        }
        const response = await axios.get('https://photon.komoot.io/api/', {
            params: { q, limit },
            headers: { 'User-Agent': 'uber-video-app/1.0' }
        });
        const places = response.data.features.map(feature => {
            const { name, housenumber, street, district, city, state, country } = feature.properties;
            const label = [ ...new Set([ name, [ housenumber, street ].filter(Boolean).join(' '), district, city, state, country ].filter(Boolean)) ].join(', ');
            const [ lng, ltd ] = feature.geometry.coordinates;
            return { label, ltd, lng };
        });
        cache.set(key, places);
        places.forEach(place => coordinatesByLabel.set(place.label, { ltd: place.ltd, lng: place.lng }));
        return places;
    });

    queue = result.catch(() => { }).then(() => new Promise(resolve => setTimeout(resolve, MIN_GAP_MS)));
    return result;
};

module.exports.getAddressCoordinate = async (address) => {
    if (coordinatesByLabel.has(address)) {
        return coordinatesByLabel.get(address);
    }

    try {
        const places = await photonSearch(address, 1);
        if (!places.length) {
            throw new Error('Unable to fetch coordinates');
        }
        return { ltd: places[ 0 ].ltd, lng: places[ 0 ].lng };
    } catch (error) {
        console.error(error.message);
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
        console.error(err.message);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    try {
        const places = await photonSearch(input, 5);
        return [ ...new Set(places.map(place => place.label).filter(value => value)) ];
    } catch (err) {
        console.error(err.message);
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