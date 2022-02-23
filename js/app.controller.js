import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLocation = onDeleteLocation;
window.onMapClick = onMapClick;


function onInit() {
    var locations = locService.getLocs();
    mapService.initMap()
        .then(renderLocation)
        .catch(() => console.log('Error: cannot init map'));
        
}

function onMapClick(map) {
    var lat = map.latLng.lat();
    var lng = map.latLng.lng();
    let CurrPosition = { lat, lng }
    mapService.panTo(CurrPosition)
    mapService.addMarker()
    mapService.getLocationClicked(CurrPosition) 
    .then(renderLocation)
    
}



// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
var adress = document.getElementById('search').value;
    mapService.goLocation(adress)
        .then(renderLocation)
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGoLocation(locationId){
}


function onDeleteLocation(locationId){
    locService.removeLoc(locationId)
    renderLocation()
}

function renderLocation(locations){
    if(!locations)  var locations=locService.getLocs()
    let elLocations=document.querySelector('.locations-table')
    var strHtml=` <table class = "table">
    <thead>
    <th> id </th>
    <th> Name </th>
    <th> pos </th>
    <th> createdAt </th>
    <th> update </th>
    <th> Actions </th>
    </thead><tbody>`
    locations.map(location => {
        strHtml += `<tr><td> ${location.id} </td>
            <td>  ${location.name} </td>
            <td> lat: ${location.pos.lat} ,lng :${location.pos.lng}</td>
            <td> ${location.createdAt}</td>
            <td> ${location.update}</td>
            <td>
            <button onclick='onGoLocation(${location.pos})'> Go </button>
            <button onclick="onDeleteLocation('${location.id}')"> Delete Location </button>
        </td></tr>`
    })
    strHtml += '</tbody></table>'
    elLocations.innerHTML = strHtml

}

