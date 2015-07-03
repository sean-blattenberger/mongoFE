'use strict';

angular.module('heimdall', ["ngRoute"])
	.config(function($routeProvider) {
	$routeProvider
		.when("/", {
		controller: "MainCtrl",
		templateUrl: "index.html"
	})
		.when("/questions/:$rootScope.slug", {
		controller: "MainCtrl",
		templateUrl: "ques.html"
	})
		.otherwise({
		redirectTo: "/"
	});
})
	.constant("ATN", {
	"API_URL": "http://localhost:3000"
})
	.factory('Question', function($http, ATN, $rootScope) {
	return {
		getAll: function() {
			return $http.get(ATN.API_URL + "/questions");
		},
		addQuestion: function(newQuestion) {
			return $http.post(ATN.API_URL + "/questions", newQuestion);
		},
		getQuestion: function(slug) {
			return $http.get(ATN.API_URL + "/questions/" + slug)
	}
	}
})
	.controller('MainCtrl', function($scope, Question, $rootScope){
	Question.getAll().success(function(data) {
		$rootScope.questions = data;
//		$rootScope.slug = data.slug;
		$rootScope.slug = data[1].slug;
	}).catch(function(err) {
		console.error(err);
	});
	$scope.viewQuestion = function (q) {
		console.log(q);
		Question.getQuestion(q).success(function(data) {
			console.log();
		});
	}
	$scope.askQuestion = function() {
		Question.addQuestion($scope.question)
			.success(function(data) {
			$rootScope.questions.unshift(data);
			$scope.question = {};
			$("#new-question-modal").modal("hide");
		})
			.catch(function(err) {
			console.error(err);
		})
	};

})
//.controller('QuesCtrl', function($scope, Question){
//
//})
