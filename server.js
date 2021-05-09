const Address = require("./src/lib/Address")
const got = require("got")

const url = "https://nominatim.openstreetmap.org/search"

const config = {
    format: "json",
    addressDetails: 1,
    limit: 1
}
const location = new Address(
    street = "Paseo de Gracias 1",
    city = "Barcelona",
    postalcode = "08007",
    country = "Spain"
)

const addressParams = Object.entries(location).map(e => e.join('=')).join('&')
const urlParams = Object.entries(config).map(e => e.join('=')).join('&')
const request = `${url}?${addressParams}&${urlParams}`

got.get(request, { responseType: 'json' })
    .then(({ body }) => {
        console.log(body)
    })
    .catch(err => {
        console.log('Error: ', err.message);
    })



