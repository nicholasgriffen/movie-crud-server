const db = require('../db')['movies']
const chai = require('chai')
const { expect } = chai
const knex = require('../db/knex')
const record = {
    title: 'digijan',
    year: 2017,
    director: 'Griff',
    rating: 5,
}

describe('db', () => {
    before(() => {
        const config = {
            directory: './db/migrations'
        }
        return knex.migrate.rollback(config)
            .then(() => knex.migrate.latest(config))
    })
    it('#save creates', () => {
        return db.save(record)
            .then(id => {
                expect(id).to.be.ok
                record.id = +id
            })
    })
    it('#load(id) loads one', () => {
        return db.load(record.id)
            .then(loaded => expect(loaded).to.include(record))
    })
    it('#load() loads all', () => {
        return db.load()
            .then(loaded => expect(loaded.find(resource => resource.id === record.id)).to.include(record))
    })
    it('#save updates', () => {
        return db.save(Object.assign(record, { year: 2099 }))
            .then(updated => db.load(updated))
            .then(loaded => expect(loaded.year).to.equal(2099))
    })
    it('deletes', () => {
        return db.delete(record.id)
            .then(deleted => db.load(deleted))
            .then(res => expect(res).to.be.undefined)
    })
})