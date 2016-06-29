var angular = require('angular');

angular.module('todoListApp')

  .service('dataService', function($http, $q) {

    this.getTodos = function(callback) {
      $http.get('/api/todos').then(callback);
    };

    this.deleteTodo = function(todo) {
      if (!todo._id) {
        return $q.resolve();
      }
      return $http.delete('/api/todos/' + todo._id);
    };

    this.saveTodos = function(todos) {
      var queue = [];
      todos.forEach(function(todo) {
        var request;
        if (!todo._id) {
          request = $http.post('/api/todos', todo);
        } else {
          request = $http.put('/api/todos/' + todo._id, todo);
        }
        queue.push(request);
      });
      $q.all(queue);
    };

  });
