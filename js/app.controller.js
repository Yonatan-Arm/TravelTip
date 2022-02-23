import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLocation = onDeleteLocation;


function onInit() {
    var locations = locService.getLocs();
    mapService.initMap()
        .then(renderLocation)
        .catch(() => console.log('Error: cannot init map'));
        
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

<<<<<<< HEAD
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
=======
function onGoLocation() {



}


function onDeleteLocation(locationIdx) {


}

function renderLocation(locations) {
    var i = 1;
    let elLocations = document.querySelector('.locations-table')
    var strHtml = ` <table class = "table">
   <tr> <th> id </th>
>>>>>>> f77fda50d90ea21781ecdfcca60776638328ce11
    <th> Name </th>
    <th> pos </th>
    <th> createdAt </th>
    <th> update </th>
    <th> Actions </th>
    </thead><tbody>`
    locations.map(location => {
<<<<<<< HEAD
        strHtml += `<tr><td> ${location.id} </td>
=======
        strHtml += `<tbody><tr><td> ${i} </td>
>>>>>>> f77fda50d90ea21781ecdfcca60776638328ce11
            <td>  ${location.name} </td>
            <td> lat: ${location.pos.lat} ,lng :${location.pos.lng}</td>
            <td> ${location.createdAt}</td>
            <td> ${location.update}</td>
            <td>
            <button onclick='onGoLocation(${location.pos})'> Go </button>
            <button onclick="onDeleteLocation('${location.id}')"> Delete Location </button>
        </td></tr>`
            i++
    })
    strHtml += '</tbody></table>'
    elLocations.innerHTML = strHtml

}

