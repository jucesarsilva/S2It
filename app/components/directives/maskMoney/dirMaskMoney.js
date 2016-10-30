/**
 * @function Directiva para mascáras de dinheiro utilizando plugin jquery (encapsulamento via angularJS)
 * @author julio_c.silva@outlook.com
 * @since 30/10/2016
 */
(function __maskMoney(){
 
    'use strict';

    angular
        .module(modules.directives)
        .directive('maskMoney', maskMoney);
    
    maskMoney.$inject = [];
    
    function maskMoney() {
        return {
            restrict: 'AE',
            link: function ($scope, elem, attrs ) {
                elem.maskMoney();
            }
        };
    };
})();