const { search } = require('./MapsClient')
const express = require('express')

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

app.post('/address', async ({ body }, res) => {
    const address = { ...body }
    const status = await search(address)
    res.sendStatus(status)
})

module.exports = app
