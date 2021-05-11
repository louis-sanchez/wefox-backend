const app = require('./lib/app')
const port = process.env.npm_package_config_port

module.exports = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})