webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);

	angular.module('todoListApp', []);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);

	angular.module('todoListApp')

	  .controller('mainCtrl', function($scope, dataService) {

	    $scope.getTodos = dataService.getTodos(function(res){
	      $scope.todos = res.data;
	    });

	    $scope.addTodo = function() {
	      $scope.todos.unshift({'name': 'New todo item'});
	    };

	    $scope.deleteTodo = function(todo) {
	      dataService.deleteTodo(todo).then(function() {
	        $scope.todos.splice($scope.todos.indexOf(todo), 1);
	      });
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);

	angular.module('todoListApp')

	  .directive('todos', function() {

	    return {
	      templateUrl: 'templates/todos.html',
	      controller: 'mainCtrl',
	      replace: true
	    };

	  });


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);

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


/***/ }
]);