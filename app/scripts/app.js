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
      .when('/', {
        templateUrl: 'views/integrantes.html',
        controller: 'IntegrantesCtrl',
        controllerAs: 'main'
      })
      .when('/integrantes/:sector', {
        templateUrl: 'views/integrantes.html',
        controller: 'IntegrantesCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('TabletopService', function ($q) {

    this.keys = false;
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

    this.getData = function(){
      var that = this;
      return $q(function(resolve, reject) {
        if(!that.data){
//          if(!that.loading){
            that.loading = true;
            Tabletop.init( { 
                key: '1MGKBNtMQKpgm4d06j2umafrh3C3nf_gxzuX3iUkJyOs', //PROD
                //key:'1c-ENCz0R139Tqnwei0BPligzlb9FGKFGL89x2SIiHnU', //TEST
                    callback: function(data, tabletop) {
                      that.data = data;
                      that.keys = _.reduce(data, function(total, value, key) {
                        if(value.elements.length>0){
                            total.push(key);
                        }
                        return total;
                      },[]);
                      that.loading = false;
                      resolve({data:that.data,keys:that.keys});
                    },
                    simpleSheet: false,
                    parseNumbers: true
                  });            
         // }
        } else {
          resolve({data:that.data,keys:that.keys});
        }
      });
    };

  });
