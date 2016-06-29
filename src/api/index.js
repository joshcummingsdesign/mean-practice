var express = require('express');
var Todo    = require('../models/todo');

var router  = express.Router();

router.get('/todos', function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json(todos);
    }
  });
});

module.exports = router;