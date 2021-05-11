const server = require('../server')
const fetch = require('node-fetch')
const nock = require('nock')
const MAPS_API = process.env.npm_package_config_maps_api


afterAll(() => server.close())

test('should return 200 if address if found', async () => {
    nock(MAPS_API)
        .get('/search?street=Paseo%20de%20Gracia%201&city=Barcelona&postalcode=08007&country=Spain&format=json&addressDetails=1&limit=1')
        .reply(200, [
            {
                "place_id": 26445028,
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "node",
                "osm_id": 2603612465,
                "boundingbox": [
                    "41.3879038",
                    "41.3880038",
                    "2.169438",
                    "2.169538"
                ],
                "lat": "41.3879538",
                "lon": "2.169488",
                "display_name": "Apple Store, 1, Passeig de Gràcia, la Dreta de l'Eixample, Eixample, Barcelona, Barcelonès, Barcelona, Catalunya, 08007, España",
                "class": "shop",
                "type": "electronics",
                "importance": 0.32100000000000006,
                "address": {
                    "shop": "Apple Store",
                    "house_number": "1",
                    "road": "Passeig de Gràcia",
                    "neighbourhood": "la Dreta de l'Eixample",
                    "city": "Barcelona",
                    "municipality": "Barcelonès",
                    "county": "Barcelona",
                    "state": "Catalunya",
                    "postcode": "08007",
                    "country": "España",
                    "country_code": "es"
                }
            }
        ])

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