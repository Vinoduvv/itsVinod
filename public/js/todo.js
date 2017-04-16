      angular.module('app', ['ngRoute', 'ngResource'])

        //---------------
        // Services
        //---------------

        .factory('Todos', ['$resource', function($resource){
          return $resource('/todos/:id', null, {
            'update': { method:'PUT' }
          });
        }])

        //---------------
        // Controllers
        //---------------

        .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
          $scope.editing = [];
          $scope.todos = Todos.query();

          $scope.save = function(){
            if(!$scope.newTodo || $scope.newTodo.length < 1) return;
            var todo = new Todos({ name: $scope.newTodo, completed: false });

            todo.$save(function(){
              $scope.todos.push(todo);
              $scope.newTodo = ''; // clear textbox
            });
          }

          $scope.update = function(index){
            var todo = $scope.todos[index];
            Todos.update({id: todo._id}, todo);
            $scope.editing[index] = false;
          }

          $scope.edit = function(index){
            $scope.editing[index] = angular.copy($scope.todos[index]);
          }

          $scope.cancel = function(index){
            $scope.todos[index] = angular.copy($scope.editing[index]);
            $scope.editing[index] = false;
          }

          $scope.remove = function(index){
            var todo = $scope.todos[index];
            Todos.remove({id: todo._id}, function(){
              $scope.todos.splice(index, 1);
            });
          }
        }])
	   .controller('LoginController', ['$scope', 'Todos','$http', function ($scope, Todos,$http) {
         // $scope.login=true;
		  $scope.changeForm=function(value){
		    $scope.login=value;
			
			if(!value)
			{
			 $scope.reg.pass="";
			$scope.reg.passCheck="";
			}
			else
			{
		   $scope.login.pass="";
			}
		  }
		  
		  $scope.reg={};
		  $scope.reg.username="";
		  $scope.reg.pass="";
		  $scope.reg.passCheck="";
		  $scope.reg.mail="";
		  $scope.login={};
		  $scope.login.user="";
		  $scope.login.pass="";
		  
		  

		  $scope.login=function() {
		  
		  if($scope.login.user && $scope.login.pass){
		  var postData={};
		  postData.Username =   $scope.login.user;
		  postData.Password =  $scope.login.pass;
		  $http.post('/login',postData);
		  }
		  }
		  
		   $scope.register=function() {
		   
		  var postData={};
		  postData.Username =   $scope.reg.username;
		  postData.Password =  $scope.reg.pass;
		  $http.post('/users/register',postData);
		  
		  }
		  
		  
        }])

    

        //---------------
        // Routes
        //---------------

        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider
		  
		   .when('/login', {
              templateUrl: 'views/login.ejs',
              controller: 'LoginController'
            })
            .when('/', {
              templateUrl: 'views/todos.ejs',
              controller: 'TodoController'
            })

        }]);