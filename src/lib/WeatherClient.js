const fetch = require('node-fetch')
const WEATHER_API = process.env.npm_package_config_weather_api

class WeatherClient {

    async forecast(lat, lon) {
        const config = {
            output: 'json',
            product: 'civillight'
        }

        const location = { lat, lon }
        const request = buildRequest(location, config)

        return fetch(request)
            .then(checkStatus)
            .then(res => res.json())
            // should catch
    }
}

function checkStatus(res) {
    if (res.ok) {
        return res
    }
}

function buildRequest(location, config) {
    const locationParams = Object.entries(location).map(e => e.join('=')).join('&')
    const urlParams = Object.entries(config).map(e => e.join('=')).join('&')
    return `${WEATHER_API}/bin/api.pl?${locationParams}&${urlParams}`
}

module.exports = new WeatherClient()