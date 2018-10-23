const { expect } = require('chai')
const movies = require('../model').movie
const movie = { title: 'digijan', year: 2017 }

describe('model', () => {
    describe('#getAll', () => {
        it('returns an object', () => {
            return movies.getAll()
                .then(records => expect(records.movies).to.be.ok)
        })
    })

    describe('#create then #getOne', () => {
        it('creates record with ${resource} key matching arguments then retrieves record by model-generated id', () => {
            return movies.create(movie)
                .then(created => {
                    expect(created.movie).to.include(movie)
                    return movies.getOne(created.movie.id)
                })
                .then(retrieved => {
                    expect(retrieved.movie).to.include(movie)
                })
        })
    })
})