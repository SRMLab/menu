var express = require('express');
var router = express.Router();
import Store from './Models/Store';

router.use( function timeLog (req, res, next){
  console.log('Time: ', Date.now())
  next()
})

// get all stores
router.get('/stores', function(req,res){
  Store.find({}, function(err, stores){
    
    if (err) res.send("Something went wrong!");
    res.json(stores);
  });
})

// get a store by id
router.get('/stores/:id', function(req,res){
  Store.findById(req.params.id).exec(function (err, store){
    if (err) res.sendStatus(404);
    res.json(store);
  });
})

// post new store
router.post('/stores', function(req,res){
  const store = new Store({...req.body});
  store.save(function(err, store){
    if (err) res.send(err);
    res.json(store);
  });
})

// update a store
router.put('/stores/:id', function(req,res){
  Store.findByIdAndUpdate(req.params.id, 
  {$set: {...req.body} },
  { new: true }
  ).exec(function (err, store){
    if (err) res.json(err);
    res.json(store);
  });
})

// delte a store
router.delete('/stores/:id', function(req,res){
  Store.findByIdAndRemove(req.params.id,
  ).exec(function (err, store){
    if (err) res.json(err);
    res.json(store);
  });
})

module.exports = router;