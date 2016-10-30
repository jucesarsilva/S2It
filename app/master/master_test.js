describe('MasterControllerTest', function () {

    beforeEach(module('ngRoute', 
                      'tooltip', 
                      'angularUtils.directives.dirPagination',
                      modules.services, 
                      modules.directives, 
                      modules.filters, 
                      modules.master,
                      modules.main));

    var $document, $controller, $notification, $compile, $rootScope;

    beforeEach(inject(function(_$document_, _$rootScope_, _$controller_, _$notification_, _$compile_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $notification = _$notification_;
        $compile = _$compile_;
    }));

    /******************* bloco de teste para verificação se funções são definidas ***********************/
    describe('--> exists function', function () {
        
        it("deve existir o método 'init()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.init).toBeDefined();
		});	
        
        it("deve existir o método 'remove()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.remove).toBeDefined();
		});	
        
        it("deve existir o método 'confirm()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.confirm).toBeDefined();
		});	
        
        it("deve existir o método 'add()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.add).toBeDefined();
		});	
        
        it("deve existir o método 'clear()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.clear).toBeDefined();
		});	
        
        it("deve existir o método 'cancel()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.cancel).toBeDefined();
		});	
        
        it("deve existir o método 'validate()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.validate).toBeDefined();
		});
        
        it("deve existir o método 'getTotal()' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            expect($scope.getTotal).toBeDefined();
		});
	});
    
    /******************** teste para comportamento da função init ***************************/
    describe("--> init() called", function () {
        
        it(" 'sortType' deve ser 'type' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            expect($scope.sortType).toContain("type");
        });	
        
        it(" 'sortReverse' deve ser 'false' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            expect($scope.sortReverse).toBe(false);
        });	
        
        it(" 'currentPage' deve ser '1' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            expect($scope.currentPage).toEqual(1);
        });	
        
        it(" 'pageSize' deve ser '5' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            expect($scope.pageSize).toEqual(5);
        });	
        
        it(" 'EnumType' deve ser equal ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            var EnumType = {
                SAQUE: "saque",
                DEPOSITO: "depósito"
            };
            expect($scope.EnumType).toEqual(EnumType);
        });
        
        it(" 'entities' deve ser 'array' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.init();
            expect($scope.entities instanceof Array).toBe(true);
        });
        
        it("deve chamar o método 'clear()' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            spyOn($scope, "clear");
            $scope.init();
            expect($scope.clear).toHaveBeenCalled();
        });	
	});
    
    /******************** teste para comportamento da função add ***************************/
    describe("--> add() called", function () {
        
        it("deve chamar o metodo 'validate()' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            spyOn($scope, "validate");
            $scope.add();
            expect($scope.validate).toHaveBeenCalled();
        });	
        
        it("deve adicionar uma entidade ao array 'entities' ", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.entities = [
            {
                value: "500.00",
                type: "saque",
                createDate: undefined
            }];
            var count = $scope.entities.length;
            $scope.entity = {
                value: "1,500.00",
                type: "saque",
                createDate: undefined
            };
            spyOn($scope, "clear");
            $scope.add();
            expect($scope.entities.length).toBeGreaterThan(count);
            expect($scope.clear).toHaveBeenCalled();
        });		
    });
    
    /******************** teste para comportamento da função clear ***************************/
    describe('--> clear() called', function () {
        
        it("deve restaurar o objeto 'limpar' dados preenchidos ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope });
            $scope.EnumType = {
                SAQUE: "saque",
                DEPOSITO: "depósito"
            };
            $scope.entity = {
                value: "1,500.00",
                type: "saque",
                createDate: "31/10/2016"
            };
            var mustToBe = {
                value: undefined,
                type: "saque",
                createDate: undefined
            };
            $scope.clear();
            expect($scope.entity).toEqual(mustToBe);
		});	
	});
    
    /******************** teste para comportamento da função validate ***************************/
    describe("--> validate() called", function () {
        
        it("deve retornar verdadeiro", function () {
            var $scope = $rootScope.$new();
            var controller = $controller('MasterController', { $scope: $scope });
            $scope.entity = {
                value: "1,500.00",
                type: "saque",
                createDate: "31/10/2016"
            };
            spyOn($scope, "validate").and.returnValue(true);            
            expect($scope.validate()).toBe(true);
            expect($scope.validate).toHaveBeenCalled();
        });	
       
    });
    
    /******************** teste para comportamento da função confirm ***************************/
    describe('--> confirm() called', function () {
        
        it("deve atualizar a variavel $scope.current ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope }); 
            var entity = {
                value: "1,500.00",
                type: "saque",
                createDate: "31/10/2016"
            };
            var mustToBe = {
                value: "1,500.00",
                type: "saque",
                createDate: "31/10/2016",
                index: 1
            }
            $scope.confirm(entity,1);
            expect($scope.current).toEqual(mustToBe);
		});	
	});
    
    /******************** teste para comportamento da função cancel ***************************/
    describe('--> cancel() called', function () {
        
        it("deve atualizar a variável $scope.current para 'null' ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope }); 
            $scope.current = {
                value: "1,500.00",
                type: "saque",
                createDate: "31/10/2016",
                index: 1
            };
            $scope.cancel();
            expect($scope.current).toBe(null);
		});	
	});
    
    /******************** teste para comportamento da função remove ***************************/
    describe('--> remove() called', function () {
        
        it("deve remover o elemento ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope }); 
            $scope.entities = [{
                value: "1,500.00",
                type: "depósito",
                createDate: "31/10/2016"
            },
            {
                value: "500.00",
                type: "saque",
                createDate: "31/10/2016"
            }         
            ];
            $scope.current = {
                value: "1,500.00",
                type: "depósito",
                createDate: "31/10/2016",
                index: 1
            };
            $scope.remove();
            expect($scope.current).toBe(null);
            expect($scope.entities.length == 1).toBeTruthy();
		});	
	});
    
    /******************** teste para comportamento da função getTotal ***************************/
    describe('--> getTotal() called', function () {
        
        it("deve obter o total dos values ", function () {
			var $scope = $rootScope.$new();
			var controller = $controller('MasterController', { $scope: $scope }); 
            $scope.EnumType = {
                SAQUE: "saque",
                DEPOSITO: "depósito"
            };
            $scope.entities = [{
                value: "1,500.00",
                type: "depósito",
                createDate: "31/10/2016"
            },
            {
                value: "500.00",
                type: "saque",
                createDate: "31/10/2016"
            }];
            
            $scope.getTotal();
            expect($scope.total).toEqual(1000);
		});	
	});
});