const app = require('./lib/app')
const PORT = process.env.npm_package_config_port

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})