'use strict';

/**
 * @ngdoc overview
 * @name gabineteApp
 * @description
 * # gabineteApp
 *
 * Main module of the application.
 */
angular
  .module('gabineteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/integrantes/:sector', {
        templateUrl: 'views/integrantes.html',
        controller: 'IntegrantesCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/integrantes/Nación'
      });
  })
  .service('TabletopService', function ($q) {

    this.data = false;
    this.loading = false;

    this.getDataOptions = function(){
      var that = this;
      return $q(function(resolve, reject) {
        that.getData().then(function(data){
          var keys = _.reduce(data, function(total, value, key) {
              if(value.elements.length>0){
                  total.push(key);
              }
              return total;
            },[]);

          resolve(keys);
        });
      });
    },

    this.getDataSector = function(sector){
      var that = this;
      return $q(function(resolve, reject) {
        that.getData().then(function(data){
          if(data[sector]){
            resolve(data[sector]);
          }
        });
      });
    },

    this.getData = function(){
      var that = this;
      return $q(function(resolve, reject) {
        if(!that.data){
//          if(!that.loading){
            that.loading = true;
            Tabletop.init( { key: '1MGKBNtMQKpgm4d06j2umafrh3C3nf_gxzuX3iUkJyOs',
                    callback: function(data, tabletop) {
                      that.data = data;
                      resolve(angular.copy(that.data));
                      that.loading = false;
                    },
                    simpleSheet: false,
                    parseNumbers: true
                  });            
         // }
        } else {
          resolve(that.data);
        }
      });
    };

  });
