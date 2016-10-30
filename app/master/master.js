/**
 * @function controller for Master
 * @author julio_c.silva@outlook.com
 * @since 29/10/2016
 * @returns
 */
(function __MasterController(){
    
    'use strict';

    angular.module(modules.master, ['ngRoute', 'tooltip', 'angularUtils.directives.dirPagination'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/master', {
        templateUrl: 'master/master.html',
        controller: 'MasterController'
      });
    }])

    .controller('MasterController', MasterController);
    
    MasterController.$inject = ['$scope', '$notification', '$timeout']
    
    function MasterController($scope, $notification, $timeout) {
 
        /**
         * @function validar novo item
         * @params
         * @returns
         */
        function validate() {
            if(!$scope.entity.value){
                $notification.alert("É necessário digitar um valor.");
                return false;
            }  
            if($scope.entity.value <= 0 ){
                $notification.alert("Somente valores positivos.");
                return false;
            } 
            return true;
        }; $scope.validate = validate;
        
        /**
         * @function limpar preenchimento
         * @params
         * @returns
         */
        function clear() {
            $scope.entity = {
                value: undefined,
                type: $scope.EnumType.SAQUE,
                createDate: undefined
            };
        }; $scope.clear = clear;
        
        /**
         * @function adicionar item
         * @params
         * @returns
         */
        function add() {
            if(!$scope.validate()) return;
            $scope.entity.createDate = moment(new Date()).format("DD/MM/YYYY - HH:mm:ss");
            $scope.entities.push(angular.copy($scope.entity));
            localStorage.setItem("S2it_entities", JSON.stringify($scope.entities));
            $scope.clear();
        }; $scope.add = add;
        
        /**
         * @function confirme remove
         * @params {object} _entity
         * @params {int} _index
         * @returns
         */
        function confirm(_entity, _index) {
            $scope.current = angular.copy(_entity);
            $scope.current.index = _index;
            $("#modal-remove").modal({backdrop:"static"});
        }; $scope.confirm = confirm;
        
        /**
         * @function cancel remove
         * @params
         * @returns
         */
        function cancel() {
           $scope.current = null;
            angular.element("#modal-remove").modal("hide");
        }; $scope.cancel = cancel;
        
        /**
         * @function remove
         * @params
         * @returns
         */
        function remove() {
            if(!$scope.current) return;
            $scope.entities.splice($scope.current.index, 1);
            localStorage.setItem("S2it_entities", JSON.stringify($scope.entities));
            $scope.current = null;
            $("#modal-remove").modal("hide");
        }; $scope.remove = remove;
        
        /**
         * @function obter total
         * @params
         * @returns
         */
        function getTotal(){
            $scope.total = 0;
            for(var i = 0; i < $scope.entities.length; i++){
                var vl = $scope.entities[i].value.replace(',','');
                if(!isNaN(vl) && vl.length!=0) {
                    if($scope.entities[i].type === $scope.EnumType.SAQUE) $scope.total-=parseFloat(vl);
                    else if($scope.entities[i].type === $scope.EnumType.DEPOSITO) $scope.total+=parseFloat(vl);
                }
            }
            return $scope.total.toFixed(2).replace(",", ".").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }; $scope.getTotal = getTotal;
        
        /**
         * @function inicializar
         * @params
         * @returns
         */
        function init() {
            $scope.sortType = 'type';
            $scope.sortReverse = false; 
            $scope.currentPage = 1;
            $scope.pageSize = 5;
            $scope.EnumType = {
                SAQUE: "saque",
                DEPOSITO: "depósito"
            };
            $scope.entities = JSON.parse(localStorage.getItem("S2it_entities")) || [];
            $scope.clear();
            $notification.clear();
        }; $scope.init = init;
        
    };
    
})();