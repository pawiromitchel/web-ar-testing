var PLACES = [];
var gevonden = [];
var GET_DATA = "static"; // change this to dynamic to get data from the api
var ASSETS_URL = "http://localhost:3010/api/asset/listAll";

const loadPlaces = function (coords) {
    if (GET_DATA === "static") {
        console.log("[i] getting static data");
        return loadPlaceStatic();
    } else if (GET_DATA === "dynamic") {
        console.log("[i] getting remote data");
        return loadPlaceDynamic();
    }
};

async function loadPlaceStatic() {
    PLACES = [
        {
            title: 'Home',
            lat: 5.6754981,
            long: -55.0723643,
            description: `dit is mijn huis`
        },
        {
            title: 'Spottie hondenhok',
            asset: 'assets/asset.png',
            lat: 5.675573,
            long: -55.072281,
            description: `dit is spottie's hondenhok en hij is zoooo blij ermee :D`
        },
        {
            title: 'Snoopy hondenhok',
            lat: 5.675581,
            long: -55.072395,
            description: `dit is snoopy's hok`
        },
    ];

    document.getElementById('totalObjects').innerHTML = PLACES.length;

    return new Promise((resolve, reject) => {
        try {
            resolve(PLACES)
        } catch (err) {
            reject(err)
        }
    })
}

async function loadPlaceDynamic() {

    // fetch assets from the API
    let response = await fetch(ASSETS_URL);
    let PLACES;

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        PLACES = await response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }

    console.log(PLACES);

    document.getElementById('totalObjects').innerHTML = PLACES.length;

    return new Promise((resolve, reject) => {
        try {
            resolve(PLACES)
        } catch (err) {
            reject(err)
        }
    })
}

window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.lat;
                    const longitude = place.long;

                    // add place link
                    const aLink = document.createElement('a-link');
                    aLink.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    aLink.setAttribute('uID', place.asset_id);
                    aLink.setAttribute('title', place.title);
                    aLink.setAttribute('description', place.description);
                    aLink.setAttribute('clickhandler', '');
                    aLink.setAttribute('look-at', "[gps-camera]");
                    aLink.setAttribute('href', '#');
                    aLink.setAttribute('scale', '1 1 1');

                    // check if the place has an image connected to it
                    if (place.asset) {
                        // add place imag
                        const aImage = document.createElement('a-image');
                        const assetSrc = place.asset;
                        aImage.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                        aImage.setAttribute('src', assetSrc);
                        aImage.setAttribute('look-at', "[gps-camera]");
                        aImage.setAttribute('scale', '1 1 1');
                        scene.appendChild(aImage);
                    }

                    scene.appendChild(aLink);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
}