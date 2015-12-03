'use strict';

/**
 * @ngdoc function
 * @name gabineteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gabineteApp
 */
angular.module('gabineteApp')
  .controller('IntegrantesCtrl', function ($scope,TabletopService,$routeParams,Slug) {

  		$scope.loading = true;

		  TabletopService.getData().then(function(info){

          if($routeParams.persona && info.keys[Slug.slugify($routeParams.persona)]){
            $scope.persona = info.keys[Slug.slugify($routeParams.persona)];
          } else {
            $scope.persona = _.values(info.keys)[0];
          }

          $scope.cargos = _.groupBy(info.data[$scope.persona].elements,function(e){
            return e.grupo;
          });

         	$scope.loading = false;

        });

  });
