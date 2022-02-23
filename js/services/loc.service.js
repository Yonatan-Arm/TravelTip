export const locService = {
    getLocs
}

import { storageService } from './local-storage.js'
const KEY = 'mapLocation'
const GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'
const API_KEY = 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g'
var selectedLocIdx;
var gLocs = []
createNewLoc('coding academy',32.0879749,34.8030999)
createNewLoc('The Electric Cave',32.0929095,34.7713273)
if(storageService.load(KEY).length) {
    gLocs = storageService.load(KEY)
} 


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

function createNewLoc(name, Let, lng) {
    var time = Date.now()
    var loc = {
        id: Math.random().toString(16).slice(2),
        name: name,
        pos:{let: Let,
            lng: lng},
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

