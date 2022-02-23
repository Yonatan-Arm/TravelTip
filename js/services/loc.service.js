export const locService = {
    getLocs,
    createNewLoc
}

import { storageService } from './local-storage.js'
const KEY = 'mapLocation'
const GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'
const API_KEY = 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g'
var selectedLocIdx;
var gLocs = (storageService.load(KEY).length) ? storageService.load(KEY) : [];
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'q', lat: 32.047201, lng: 34.832581 }
]

function getLoc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
        console.log();
    });
}

function createNewLoc(name,lat , lng) {
    var time = Date.now()
    var loc = {
        id: Math.random().toString(16).slice(2),
        name: name,
        pos : {lat, lng},
        createdAt: time,
        update: null
    }
    gLocs.push(loc)
    storageService.save(KEY, gLocs)
}

function getLocs(){
    return gLocs;
}


function getLocById(id) {
    var locIdx = gLocs.findIndex(loc => loc.id === id)
    selectedLocIdx = locIdx;
    return gLocs[locIdx];
}

function removeLoc(id) {
    getLocById(id);
    gLocs.splice(selectedLocIdx, 1)
}

