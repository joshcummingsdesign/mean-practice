var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-todo', function(err) {
  if (err) {
    console.log('There was an error connecting to the database.');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});
