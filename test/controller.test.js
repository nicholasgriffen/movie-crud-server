const { expect } = require('chai')
const movies = require('../controller').movie

const req = {
    body: { title: 'digijan', year: 2017 },
    params: {},
}
const send = arg => arg
const next = send

const res = {
    send,
    status: function () {
        return this
    },
}

describe('controller', () => {
    describe('#getAll', () => {
        it('returns an object', () => {
            return movies.getAll(req, res, next)
                .then(resource => expect(resource.movies).to.be.ok)
        })
    })
    describe('#create', () => {
        it('returns resource object with ${resource} key matching data that was passed in', () => {
            return movies.create(req, res, next)
                .then(resource => expect(resource.movie).to.include(req.body))
        })
    })

    describe('#getOne', () => {
        it('returns resource object with resource.id matching id that was passed in', () => {
            return require('../model')['movie'].create(req.body)
                .then(record => {
                    req.params.id = record.movie.id
                    return movies.getOne(req, res, next)
                })
                .then(resource => expect(resource.movie).to.include(req.body))
        })
    })
})