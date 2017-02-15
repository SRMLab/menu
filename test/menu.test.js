import Store from '../src/Models/Store';
import Menu from '../src/Models/Menu';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const WEB = 'http://localhost:8000';

describe('Menus', () => {
  before((done) => {
    Store.remove({}, (err) => {
      done();
    })
  })
  let storeId;
  it('it should POST a store', (done) => {
    let store = new Store({name: "store1", email:"store@store.com"});
    chai.request(WEB)
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
  let menuId;
  it('it should POST a menu to a store', (done) => {
    let menu = new Menu({name: "gyros", price: 8.23, vegan: true, description: "yummm"});
    chai.request(WEB)
      .post(`/api/${storeId}/menus`)
      .send(menu)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('gyros');
        menuId = res.body._id;
        done();
      })
  })

  it('it should GET all the MENUS', (done) => {
    chai.request(WEB)
      .get(`/api/${storeId}/menus`)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        console.log("RESBODY ::::  ", res.body)
        res.body[0].should.have.property('name').eql('gyros');
        done();
      })
  })
  
  it('it should GET a menu by menuId', (done) => {
    chai.request(WEB)
      .get(`/api/menus/${menuId}`)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('gyros');
        done();
      })
  })
  let menuId2;
  it('should POST a menu to a store', (done) => {
    let menu = new Menu({name: "plum tea", price: 2.05, vegan: true, description: "caution, hot!"});
    chai.request(WEB)
      .post(`/api/${storeId}/menus`)
      .send(menu)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('plum tea');
        menuId2 = res.body._id;
        done();
      })
  })
  it('should GET all the MENUS', (done) => {
    chai.request(WEB)
      .get(`/api/${storeId}/menus`)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      })
  })

  it('should PUT a certain store by id', (done) => {
    chai.request(WEB)
      .put(`/api/menus/${menuId2}`)
      .send({name: "lemon tea"})
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql("lemon tea");
        res.body.should.have.property('vegan').eql(true);
        done();
      })
  })

  it('should DELETE a certain menu', (done) => {
    chai.request(WEB)
      .delete(`/api/menus/${menuId}`)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })

  it('should GET all the menus', (done) => {
    chai.request(WEB)
      .get(`/api/${storeId}/menus`)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      })
  })
})