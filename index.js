require('dotenv').config()
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/movies', router.movie)

app.use((req, res, next) => {
    return next(new Error('help'))
})

app.use((err, req, res, next) => {
    res.send(err)
})

app.listen(port, () => `Listening on ${port}`)

module.exports = app