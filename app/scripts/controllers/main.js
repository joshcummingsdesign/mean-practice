var angular = require('angular');

angular.module('todoListApp')

  .controller('mainCtrl', function($scope, dataService) {

    $scope.getTodos = dataService.getTodos(function(res){
      $scope.todos = res.data;
    });

    $scope.addTodo = function() {
      $scope.todos.unshift({'name': 'New todo item'});
    };

    $scope.deleteTodo = function(todo) {
      dataService.deleteTodo(todo);
      $scope.todos.splice($scope.todos.indexOf(todo),1);
    };

    $scope.saveTodos = function() {
      var todos = $scope.todos.filter(function(todo) {
        return todo.edited ? todo : false;
      });
      dataService.saveTodos(todos);
      $scope.todos = $scope.todos.filter(function(todo) {
        todo.edited = false;
        return todo;
      });
    };

  });
