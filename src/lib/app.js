const { search } = require('./MapsClient')
const { forecast } = require('./WeatherClient')

const express = require('express')

const HTTP_OK = 200
const HTTP_NOT_FOUND = 404

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

app.post('/address', async ({ body }, res) => {

    const address = { ...body }
    console.log(address)
    const response = await search(address)

    if (response.length) {
        console.log(response)
        res.sendStatus(HTTP_OK)
    }
    else
        res.sendStatus(HTTP_NOT_FOUND)
    
})

app.post('/weather', async ({ body }, res) => {
    const address = { ...body }
     const response = await search(address)

    if (response.length) {
        console.log(response)
        const lat  = response[0].lat
        const lon  = response[0].lon

        console.log("lat", lat)
        console.log("lon", lon)

        const weather = await forecast(lat, lon)
        console.log(weather)

        res.sendStatus(HTTP_OK)
    }
    else
        res.sendStatus(HTTP_NOT_FOUND)
})

const isEmpty = (obj) => {
    return (Object.entries(obj).length === 0 && obj.constructor === Object)
}

module.exports = app
