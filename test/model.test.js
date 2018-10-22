const { expect } = require('chai')
const movies = require('../model').movie

describe('model', () => {
    describe('#getAll', () => {

        it('returns an object', () => {
            return movies.getAll()
                .then(records => expect(records.movies).to.be.ok)
        })
    })
    describe('#create', () => {

        it('returns resource object with ${resource} key matching data that was passed in', () => {
            const movie = ['title', 'wow']
            return movies.create(movie)
                .then(resource => expect(resource.movie).to.deep.equal(movie))
        })
    })
})