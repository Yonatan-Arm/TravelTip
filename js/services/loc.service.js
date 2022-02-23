export const locService = {
    getLocs
}

const GEO_URL ='https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'
const API_KEY = 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g'


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'q', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
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
        let: Let,
        lng: lng,
        createdAt: time,
        update: null
    }
    gLocs.push(loc)
    storageService.save(KEY, gLocs)
}


function getLocById(id){
    var locIdx = gLocs.findIndex(loc => loc.id === id)
    return gLocs[locIdx];
}

