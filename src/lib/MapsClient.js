const fetch = require('node-fetch')
const MAPS_API = process.env.npm_package_config_maps_api

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

        return fetch(request)
            .then(checkStatus)
            .then(res => res.json())
    }
}

function checkStatus(res) {
    if (res.ok) {
        return res
    }
}

module.exports = new MapClient()