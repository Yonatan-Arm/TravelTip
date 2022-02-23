import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;


function onInit() {
    mapService.initMap()
        .then(() => {
           
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
        
 renderLocation(locations)
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
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.initMap(pos.coords.latitude,pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGoLocation(){



}


function onDeleteLocation(locationIdx){


}

function renderLocation(locations){
    let elLocations=document.querySelector('.locations-table')
    var strHtml=` <table class = "table">
   <tr> <th> id </th>
    <th> Name </th>
    <th> pos </th>
    <th> createdAt </th>
    <th> update </th>
    <th> Actions </th>
    </tr>`
    locations.map(location => {
        strHtml += `<tbody><tr><td> ${location.id} </td>
            <td>  ${location.name} </td>
            <td> ${location.pos}</td>
            <td> ${location.createdAt}</td>
            <td> ${location.update}</td>
            <td>
            <button onclick='onGoLocation(${location.pos})'> Go </button>
            <button onclick='onDeleteLocation(${location.id})'> Delete Location </button>
        </td></tr>`

    })
    strHtml += '</tbody></table>'
    elLocations.innerHTML = strHtml

}



var locations= [{  id: '1',
    name:  'Home',
    pos: 'lat : 31 , lng : 34',
    createdAt: Date.now(),
    update: 'AA'},
{  id: '2',
    name:  'Work',
    pos: 'lat : 31.2 , lng : 34.2',
    createdAt:  Date.now(),
    update: 'AA'}]