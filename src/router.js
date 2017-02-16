var express = require('express');
var router = express.Router();
import Store from './Models/Store';
import Menu from './Models/Menu';

router.use( function timeLog (req, res, next){
  // console.log('Time: ', Date.now())
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

// delete a store
router.delete('/stores/:id', function(req,res){
  Store.findByIdAndRemove(req.params.id,
  ).exec(function (err, store){
    if (err) res.json(err);
    res.json(store);
  });
})



// post new menu
router.post('/:storeId/menus', function(req,res){
  Store.findById(req.params.storeId).exec(function (err, store){
    const newMenu = new Menu({_store:req.params.storeId, ...req.body});
    // console.log("newMenu:::   ",newMenu);
    newMenu.save(function(err, menu){
      if (err) res.json(err);
      // console.log("Store:::   ",store)
      // console.log("MENU::::   ",menu)
      store._menus.push(menu._id);
      store.save(function(err){
        if (err) res.json(err);
        res.json(menu);
      })
    })
  });
})

// get all menus by a store
router.get('/:storeId/menus', function(req,res){
  Store.findById(req.params.storeId).populate('_menus').exec(function (err, store){
    if (err) res.json(err);
    res.json(store._menus);
  });
})

// get a menu by id
router.get('/menus/:menuId', function(req,res){
  Menu.findById(req.params.menuId).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})

// update a menu
router.put('/menus/:menuId', function(req,res){
  Menu.findByIdAndUpdate(req.params.menuId,
  {$set: {...req.body} },
  { new: true }
  ).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})

// delete a menu
router.delete('/menus/:menuId', function(req,res){
  Menu.findByIdAndRemove(req.params.menuId,
  ).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})


module.exports = router;
