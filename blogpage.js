var app = angular.module('Blogpage', ['ngResource','ngRoute']);

				/*App Configs*/
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/index.html',
			controller: 'HomeCtrl'
		})
		.when('/bloges', {
			templateUrl: 'partials/bloges.html',
			controller: 'BlogCtrl'
		})
		.when('/add-blog', {
			templateUrl: 'partials/add-blog.html',
			controller: 'AddBlogCtrl'
		})
		.when('/blog/:id', {
			templateUrl: 'partials/add-blog.html'
		})
		.when('/about', {
			templateUrl: 'partials/about.html'
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html'
		})
		/*.when('/blog-page', {
			templateUrl: 'partials/bloges.html',
			//controller: 'HomeCtrl'
		})*/
		.otherwise({
			redirectTo: '/'
		});
}]);
	/* enable url rendering, make page refreshable. 
	Default: angular-rendered pages do not produce urls*/
app.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(false);
}]);

				/*Controllers*/

app.controller('HomeCtrl', ['$scope', '$location', '$anchorScroll','$routeParams',
  function($scope, $location, $anchorScroll, $timeout, $routeParams) {
    $scope.gotoBlog = function(id) {   	
    	$timeout(function() {
    		$location.hash(id);
    		$anchorScroll();
    	}, 800);
    	
    };
}]);
app.controller('BlogCtrl', ['$scope', '$resource',
	function($scope, $resource){
		var Blogs = $resource('/api/blogs');
		Blogs.query(function(blogs){
			$scope.blogs = blogs;
		});	
	}
	]);

app.controller('AddBlogCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var Blogs = $resource('/api/blogs');
			Blogs.save($scope.blog, function(){
				$location.path('/bloges');
			});
		};
	}]);
app.controller('EditBlogCtrl', ['$scope', '$resource', '$location', '$routeParams', 
	function($scope, $resource, $location, $routeParams){
		var Blogs = $resource('/api/blogs/:id', {id: '@_id'}, {
			update: { method: 'PUT'}
		});
	Blogs.get({id: $routeParams.id}, function(blog){
		$scope.blog = blog;
	});
	$scope.save = function(){
		Blogs.update($scope.blog, function(){
			$location.path('/');
		});
	}
}]);
/*
app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});*/
/*app.value('duScrollDuration', 2000);
app.value('duScrollOffset', 0);
app.controller('HomeCtrl', function($scope, $document) {
	$document.scrollTopAnimated(400).then(function(){
		console && console.log('You just scrolled to the top');
	});
	var someElement = angular.element(document.getElementById('some-id'));
	$document.scrollToElementAnimated(someElement);
});*/
