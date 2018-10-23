const { expect } = require('chai')
const movies = require('../controller').movie

const req = {
    body: { title: 'controller.test.js', year: (new Date()).getFullYear() },
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
        it('returns an object with ${resources} key', () => {
            return movies.getAll(req, res, next)
                .then(resource => expect(resource.movies).to.be.ok)
        })
    })
    describe('implements CRUD', () => {
        it('returns resource object with ${resource} key matching data that was passed in', () => {
            return movies.create(req, res, next)
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
        })
    })
})