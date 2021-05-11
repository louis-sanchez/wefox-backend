const server = require('../server')
const fetch = require('node-fetch')

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

    const { status } = await fetch('http://localhost:3000/address', options)
    return expect(status).toBe(200)
})