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
    'ngTouch',
    'slugifier'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/integrantes.html',
        controller: 'IntegrantesCtrl',
        controllerAs: 'main'
      })
      .when('/integrantes/:persona', {
        templateUrl: 'views/integrantes.html',
        controller: 'IntegrantesCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('TabletopService', function ($q,Slug) {

    this.keys = false;
    this.data = false;
    this.loading = false;

    this.getData = function(){
      var that = this;
      return $q(function(resolve, reject) {
        if(!that.data){
//          if(!that.loading){
            that.loading = true;

            d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSZG-bnXn217ELlkVTAuNZDdmtdPTdsbJ6CGYxAXyFEz24Uk503mOeMtr2dEVUNlg2OowwWpCOKGgIr/pub?gid=1766965020&single=true&output=csv")
            .then(function(indexData) {
                var fileList = [];

                that.keys = {}
                that.data = {}

                indexData.forEach(function(row){
                  fileList.push(
                    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSZG-bnXn217ELlkVTAuNZDdmtdPTdsbJ6CGYxAXyFEz24Uk503mOeMtr2dEVUNlg2OowwWpCOKGgIr/pub?single=true&output=csv&gid="+row.id_hoja)
                      .then(function(data) {return data})
                  )
                  that.keys[Slug.slugify(row.grupo)] = row.grupo;
                })

                Promise.all(fileList).then(function(responses) {

                  indexData.map(function(row,ix) {
                    that.data[row.grupo] = {elements: responses[ix]};
                  })

                  that.loading = false;
                  resolve({ data: that.data, keys: that.keys });
                })

                return indexData;
            });



         // }
        } else {
          resolve({data:that.data,keys:that.keys});
        }
      });
    };

  });
