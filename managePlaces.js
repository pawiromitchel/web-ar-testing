const loadPlaces = function (coords) {
    return loadPlaceStatic();
};

function loadPlaceStatic() {
    const PLACES = [
        {
            name: 'Home',
            location: {
                lat: 5.6754981,
                lng: -55.0723643,
            }
        },
        {
            name: 'Spottie hondenhok',
            asset: 'assets/asset.png',
            location: {
                lat: 5.675573,
                lng: -55.072281,
            }
        },
        {
            name: 'Snoopy hondenhok',
            location: {
                lat: 5.675581,
                lng: -55.072395,
            }
        },
    ];

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
                    aLink.setAttribute('title', place.name);
                    aLink.setAttribute('clickhandler', '');
                    aLink.setAttribute('look-at', "[gps-camera]");
                    // text.setAttribute('href', 'https://akqa.com/');
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