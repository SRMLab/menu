
import Store from '../src/Models/Store';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Stores', () => {
  before((done) => {
    Store.remove({}, (err) => {
      done();
    })
  })
  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:8000')
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  })
  it('it should not POST a store without name', (done) => {
    let store = new Store({email:"store@store.com"});
    chai.request('http://localhost:8000')
      .post('/api/stores')
      .send(store)
      .end((err,res) => {
        console.log(res.body)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      })
  })
  let storeId;
  it('it should POST a store', (done) => {
    let store = new Store({name: "sotre1", email:"store@store.com"});
    chai.request('http://localhost:8000')
      .post('/api/stores')
      .send(store)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        storeId = res.body._id;
        done();
      })
  })
  it('it should GET a store by id', (done) => {
    chai.request('http://localhost:8000')
      .get('/api/stores/' + storeId)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      })
  })
  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:8000')
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      })
  })
  it('it should PUT a certain store by id', (done) => {
    chai.request('http://localhost:8000')
      .put('/api/stores/' + storeId)
      .send({name: "STORE111111"})
      .end((err,res) => {
        console.log("STATSUUSUDU",res.status)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql("STORE111111");
        res.body.should.have.property('email').eql("store@store.com");
        done();
      })
  })
  it('it should DELETE a certain store', (done) => {
    chai.request('http://localhost:8000')
      .delete('/api/stores/' + storeId)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:8000')
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  })
})


