import { storageService } from './local-storage.js'
import { locService } from './loc.service.js'


export const mapService = {
    initMap,
    addMarker,
    panTo,
    goLocation,
    getLocationClicked,
    renderMark
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
            renderMark()
            

        })
}

function goLocation(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => {
            getCurrentPosition = res.data.results[0].geometry.location
            console.log(getCurrentPosition);
            initMap(getCurrentPosition.lat,getCurrentPosition.lng)
            locService.createNewLoc(address,getCurrentPosition.lat,getCurrentPosition.lng)
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


function renderMark(){
    let locations = locService.getLocs()
    locations.map(location => {
        addMarker(location.pos)
    })
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}




function getLocationClicked(pos) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${API_KEY}`)
        .then(res => {
            getCurrentPosition = res.data.results[0].geometry.location
            initMap(getCurrentPosition.lat,getCurrentPosition.lng)
            locService.createNewLoc(res.data.results[0]['formatted_address'],getCurrentPosition.lat,getCurrentPosition.lng)
        })

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