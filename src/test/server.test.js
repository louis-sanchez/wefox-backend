const server = require('../server')
const fetch = require('node-fetch')
const nock = require('nock')

const MAPS_API = process.env.npm_package_config_maps_api
const WEATHER_API = process.env.npm_package_config_weather_api
const addressFixture = require('./fixtures/address.json')
const weatherFixture = require('./fixtures/weather.json')

afterAll(() => server.close())

describe('/address', () => {
    test('should return 200 if address if found', async () => {
        nock(MAPS_API)
            .get('/search?street=Paseo%20de%20Gracia%201&city=Barcelona&postalcode=08007&country=Spain&format=json&addressDetails=1&limit=1')
            .reply(200, addressFixture)

        const address = {
            street: 'Paseo de Gracia',
            streetNumber: '1',
            town: 'Barcelona',
            postalCode: '08007',
            country: 'Spain'
        }

        const options = {
            method: 'post',
            body: JSON.stringify(address),
            headers: { 'Content-Type': 'application/json' },
        }

        const res = await fetch('http://localhost:3000/address', options)
        expect(res.status).toBe(200)
    })

    test('should return 404 if address is not found', async () => {
        nock(MAPS_API)
            .get('/search?street=Not%20Exist%20Street%201&city=Barcelona&postalcode=08007&country=Spain&format=json&addressDetails=1&limit=1')
            .reply(200, [])

        const address = {
            street: 'Not Exist Street',
            streetNumber: '1',
            town: 'Barcelona',
            postalCode: '08007',
            country: 'Spain'
        }

        const options = {
            method: 'post',
            body: JSON.stringify(address),
            headers: { 'Content-Type': 'application/json' },
        }

        const res = await fetch('http://localhost:3000/address', options)
        expect(res.status).toBe(404)
    })
})

describe('/weather', () => {
    test('should return 200 and forecast', async () => {
        nock(MAPS_API)
            .get('/search?street=Paseo%20de%20Gracia%201&city=Barcelona&postalcode=08007&country=Spain&format=json&addressDetails=1&limit=1')
            .reply(200, addressFixture)

        nock(WEATHER_API)
            .get('/bin/api.pl')
            .query({
                lon: '2.169488',
                lat: '41.3879538',
                product: 'civillight',
                output: 'json'
            })
            .reply(200, weatherFixture)

        const address = {
            street: 'Paseo de Gracia',
            streetNumber: '1',
            town: 'Barcelona',
            postalCode: '08007',
            country: 'Spain'
        }

        const options = {
            method: 'post',
            body: JSON.stringify(address),
            headers: { 'Content-Type': 'application/json' },
        }

        const expectedBody = {
            date: 20210521,
            weather: "mcloudy",
            temp2m: {
              max: 31,
              min: 29
            },
            wind10m_max: 4
          }

        return fetch('http://localhost:3000/weather', options)
          .then(res => {
            expect(res.status).toBe(200)
            return res.json()
          })
          .then(actualBody => {
            expect(actualBody).toStrictEqual(expectedBody)
          })
    })
})