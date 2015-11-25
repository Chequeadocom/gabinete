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

  		$scope.sector = $routeParams.sector;

  		$scope.loading = true;

		TabletopService.getDataSector($routeParams.sector).then(function(info){
         	$scope.cargos = _.groupBy(info.elements,function(e){
         		return e.grupo;
         	});

         	$scope.loading = false;

        });

  });
