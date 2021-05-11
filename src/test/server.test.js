const server = require('../server')
const fetch = require('node-fetch')
const nock = require('nock')
const MAPS_API = process.env.npm_package_config_maps_api

nock(MAPS_API)
    .get('/search?street=Paseo%20de%20Gracia%201&city=Barcelona&postalcode=08007&country=Spain&format=json&addressDetails=1&limit=1')
    .reply(200)

afterAll(() => server.close())

test('should return 200 if address if found', async () => {
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