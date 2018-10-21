const chai = require('chai')
const { expect } = chai
const app = require('../index')

chai.use(require('chai-http'))

describe('The server', () => {
    it('responds with 205 and body.resources to a get at /resource', (done) => {
        chai.request(app)
            .get('/movies')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(205)
                expect(res.body.movies).to.be.ok
                done()
            })
    })
    it('responds with 201 and body.resource at /resource', (done) => {
        chai.request(app)
            .post('/movies')
            .send({ title: 'Digijan', year: 2018 })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(201)
                expect(res.body.movie).to.deep.equal({ title: 'Digijan', year: 2018 })
                done()
            })
    })
})