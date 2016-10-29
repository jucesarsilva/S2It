/**
 * @function main module
 * @author julio_c.silva@outlook.com
 * @since 29/10/2016
 * @returns
 */
(function __S2it(){
    
    'use strict';
    
    angular.module(modules.main, ['ngRoute',
      modules.master,
      modules.directives,
      modules.filters,
      modules.services
    ])
    .config(Config);
    
    Config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider'];
    
    function Config($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/master'});
    };
    
})();