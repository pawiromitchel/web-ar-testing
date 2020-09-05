var PLACES = [];
var gevonden = [];

const loadPlaces = function (coords) {
    return loadPlaceStatic();
};

function loadPlaceStatic() {
    PLACES = [
        {
            id: 1,
            name: 'Home',
            location: {
                lat: 5.6754981,
                lng: -55.0723643,
            }, 
            description: `dit is mijn huis`
        },
        // {
        //     id: 2,
        //     name: 'Spottie hondenhok',
        //     asset: 'assets/asset.png',
        //     location: {
        //         lat: 5.675573,
        //         lng: -55.072281,
        //     },
        //     description: `dit is spottie's hondenhok en hij is zoooo blij ermee :D`
        // },
        {
            id: 3,
            name: 'Snoopy hondenhok',
            location: {
                lat: 5.675581,
                lng: -55.072395,
            },
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

window.onload = () => {
    const scene = document.querySelector('a-scene');
    

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place link
                    const aLink = document.createElement('a-link');
                    aLink.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    aLink.setAttribute('uID', place.id);
                    aLink.setAttribute('title', place.name);
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