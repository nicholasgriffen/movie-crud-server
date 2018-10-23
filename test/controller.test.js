const { expect } = require('chai')
const movies = require('../controller').movies

const req = {
    body: {
        title: 'digijan',
        year: 2017,
        director: 'Griff',
        rating: 5,
    },
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
    it(`
       getAll, body.resources
    C: create, body.resource 
    R: getOne(id) body.resource 
    U: update(id) body 
    D: delete(id) body `, () => {
        movies.create(req, res, next)
            .then(created => {
                expect(created.movie).to.include(req.body)
                req.params.id = created.movie.id
                return movies.getOne(req, res, next)
            })
            .then(retrieved => {
                expect(retrieved.movie).to.include(req.body)
                req.body.title = `${new Date()}`
                return movies.update(req, res, next)
            })
            .then(updated => {
                expect(`${new Date()}`).to.include(updated.title)
                expect(updated.id).to.equal(req.params.id)
                return movies.delete(req, res, next)
            })
            .then(deleted => {
                expect(deleted.id).to.equal(req.params.id)
                return movies.getOne(req, res, next)
            })
            .then(retrieved => {
                expect(retrieved).to.have.own.property('movie')
                expect(retrieved.movie).to.be.undefined
            })
        movies.getAll(req, res, next)
            .then(resource => expect(resource.movies).to.be.ok)
    })
})