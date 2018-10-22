const express = require('express')
// Middleware
const router = require('./router')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
// Server
const app = express()
const port = process.env.PORT || 3030

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
// Dynamic route buil
router.mount(router, app)

// catch 404
app.use((req, res, next) => {
    const msg = 'no routes found'
    const err = new Error(msg)
    err.status = 404
    return next(err)
})

// finally
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json(err)
})

app.listen(port, () => `Listening on ${port}`)

module.exports = app