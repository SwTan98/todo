const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/database_config.js')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(err => {
    console.log('Could not connet to the database. Exiting now...', err)
    process.exit()
})

require('./app/routes/note_routes.js')(app)

app.listen(port, () => {
    console.log(`We are live on ${port}`)
})