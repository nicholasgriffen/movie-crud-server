const { expect } = require('chai')
const movies = require('../model').movie
const movie = { title: 'digijan', year: 2017, id: 1 }

describe('model', () => {
    describe('#getAll', () => {
        it('returns an object', () => {
            return movies.getAll()
                .then(records => expect(records.movies).to.be.ok)
        })
    })

    describe('#create', () => {
        it('returns resource object with ${resource} key matching data that was passed in', () => {
            return movies.create(movie)
                .then(resource => expect(resource.movie).to.include(movie))
        })
    })

    describe('#getOne', () => {
        it('returns resource object with ${resource}.id matching id that was passed in', () => {
            return movies.getOne(movie.id)
                .then(resource => expect(resource.movie).to.deep.equal(movie))
        })
    })
})