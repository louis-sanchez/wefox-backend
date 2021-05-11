const fetch = require('node-fetch')

class MapClient {

    async search(address) {
        const url = 'https://nominatim.openstreetmap.org/search'

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
        const request = `${url}?${addressParams}&${urlParams}`
        
        
        const options = {
            method: 'get',
            body: JSON.stringify(address),
            headers: { 'Content-Type': 'application/json' },
        }
        
        const { status } = await fetch(request)        
        return status
    }
}

module.exports = new MapClient()