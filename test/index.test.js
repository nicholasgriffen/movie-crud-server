const chai = require('chai')
const { expect } = chai
const app = require('../index')

chai.use(require('chai-http'))

describe('The server', () => {
    it('responds with 205 and a body to a get at /movies', (done) => {
        chai.request(app)
            .get('/movies')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.status).to.equal(205)
                expect(res.body).to.be.ok
                done()
            })
    })
    it('responds with data to a get at /movies', (done) => {
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