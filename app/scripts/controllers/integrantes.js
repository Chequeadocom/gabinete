'use strict';

/**
 * @ngdoc function
 * @name gabineteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gabineteApp
 */
angular.module('gabineteApp')
  .controller('IntegrantesCtrl', function ($scope,TabletopService,$routeParams) {

      $scope.sector = '';

  		$scope.loading = true;

		TabletopService.getData().then(function(info){

          if($routeParams.sector && info.data[$routeParams.sector]){
            $scope.sector = info.keys[$routeParams.sector];
          } else {
            $scope.sector = _.values(info.keys)[0];
          }

         	$scope.cargos = _.groupBy(info.data[$scope.sector].elements,function(e){
         		return e.grupo;
         	});

         	$scope.loading = false;

        });

  });
