import { storageService } from './local-storage.js'


export const mapService = {
    initMap,
    addMarker,
    panTo
}

var gMap;
var getCurrentPosition;
const KEY = 'mapLocation'
const API_KEY = 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g'


function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 16
            })
            google.maps.event.addListener(gMap, 'click', onMapClick)
            addMarker(getCurrentPosition)

        })
}
serchLoc('לכיש 15 גבעתיים');
function serchLoc(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => {
            getCurrentPosition = res.data.results[0].geometry.location
            initMap(getCurrentPosition.lat,getCurrentPosition.lng)
           
        })

}


function addMarker(loc = getCurrentPosition ) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });

    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}


function onMapClick(map) {
    var lat = map.latLng.lat();
    var lng = map.latLng.lng();
    getCurrentPosition = { lat, lng }
    // showLocation(getCurrentPosition)
    addMarker()

}



function showLocation(position) {
    initMap(position.lat, position.lng);


}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}