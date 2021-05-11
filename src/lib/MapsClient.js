const fetch = require('node-fetch')
const MAPS_API = process.env.npm_package_config_maps_api

const HTTP_OK = 200
const HTTP_NOT_FOUND = 404

class MapClient {

    async search(address) {
        const config = {
            format: 'json',
            addressDetails: 1,
            limit: 1
        }

        const location = {
            street: `${address.street} ${address.streetNumber}`,
            city: address.town,
            postalcode: address.postalCode,
            country: address.country
        }

        const addressParams = Object.entries(location).map(e => e.join('=')).join('&')
        const urlParams = Object.entries(config).map(e => e.join('=')).join('&')
        const request = `${MAPS_API}/search?${addressParams}&${urlParams}`


        const options = {
            method: 'get',
            body: JSON.stringify(address),
            headers: { 'Content-Type': 'application/json' },
        }

        return fetch(request)
            .then(checkStatus)
            .then(res => res.json())
            .then(json => {
                if (json.length)
                    return HTTP_OK
                else
                    return HTTP_NOT_FOUND
            })    
    }
}

function checkStatus(res) {
    if (res.ok) {
        return res
    }
}

module.exports = new MapClient()