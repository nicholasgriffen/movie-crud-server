const { expect } = require('chai')
const movies = require('../model').movie

describe('model', () => {
    describe('#getAll', () => {
        it('returns an object', () => {
            return movies.getAll()
                .then(thing => expect(thing).to.be.an('object'))
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