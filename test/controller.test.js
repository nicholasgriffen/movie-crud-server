const { expect } = require('chai')
const movies = require('../controller').movie

const req = { body: ['title', 'wow'] }
const res = {
    send: arg => arg,
    status: function () {
        return this
    },
}
const next = error => error

describe('controller', () => {
    describe('#getAll', () => {
        it('returns an object', () => {
            return movies.getAll(req, res, next)
                .then(resource => expect(resource).to.be.an('object'))
        })
    })
    describe('#create', () => {
        it('returns resource object with ${resource} key matching data that was passed in', () => {
            return movies.create(req, res, next)
                .then(resource => expect(resource.movie).to.deep.equal(req.body))
        })
    })
})