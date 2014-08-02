'use strict';

/*
 * AngularJS toasty
 * Version: 0.1.2
 
 */

angular.module('toasty', ['ngAnimate'])
    .service('toasty', ['$rootScope',
        function($rootScope) {
            var that = this;
            this.pop = function(options) {
                this.toasty = options;
                $rootScope.$broadcast('toasty-newToasty');
            };

            this.pop.success = function(options) {
                options.type = 'success';
                that.pop(options);
            }
            this.pop.wait = function(options) {
                options.type = 'wait';
                that.pop(options);
            }
            this.pop.warning = function(options) {
                options.type = 'warning';
                that.pop(options);
            }
            this.pop.error = function(options) {
                options.type = 'error';
                that.pop(options);
            }
            this.pop.info = function(options) {
                options.type = 'info';
                that.pop(options);
            }
            this.clear = function() {
                $rootScope.$broadcast('toasty-clearToasties');
            };
            this.removeToasty = function(id) {
                $rootScope.$broadcast('toasty-removeToasty', id);
            };

        }
    ])
    .constant('toastyConfig', {
        'limit': 10, // limits max number of toasty pops displayed.
        'showClose': true, // show / hide close button.
        'clickToClose': false, // enable disable click to close.
        'pushTo': 'top', // postion where new toaties are pushed to, top or bottom.
        'timeout': 3000, // how long to show the toasty for in ms, set to 0 for indefinite.
        'position': 'toasty-bottom-right',
        'icon-classes': {
            error: 'toasty-error',
            info: 'toasty-info',
            wait: 'toasty-wait',
            success: 'toasty-success',
            warning: 'toasty-warning'
        },
        //  'body-output-type': '', // Options: '', 'trustedHtml', 'template'
        // 'body-template': 'toastyBodyTmpl.html',
        classes: {
            'icon': 'toasty-info',
            'title': 'toasty-title',
            'msg': 'toasty-message'
        }

    })
    .directive('toastyContainer', ['$compile', '$timeout', '$sce', 'toastyConfig', 'toasty',
        function($compile, $timeout, $sce, toastyConfig, toasty) {

            return {
                replace: true,
                restrict: 'EA',
                scope: true, // creates an internal scope for this directive
                link: function(scope, elm, attrs) {

                    var id = 0,
                        mergedConfig;

                    mergedConfig = angular.extend({}, toastyConfig, scope.$eval(attrs.toastyDefaults));

                    scope.config = {
                        position: mergedConfig['position']
                    };

                    scope.configureTimer = function configureTimer(toasty) {
                        var timeout = typeof(toasty.timeout) == "number" ? toasty.timeout : mergedConfig['timeout'];
                        if (timeout > 0)
                            setTimeout(toasty, timeout);
                    };

                    function addToasty(toasty) {
                        toasty.type = mergedConfig['icon-classes'][toasty.type];
                        toasty.config = angular.extend({}, mergedConfig, toasty);

                        if (!toasty.type)
                            toasty.type = mergedConfig['icon-class'];

                        id++;
                        angular.extend(toasty, {
                            id: id
                        });

                        // Set the toasty.bodyOutputType to the default if it isn't set
                        toasty.bodyOutputType = toasty.bodyOutputType || mergedConfig['body-output-type'];

                        switch (toasty.bodyOutputType) {
                            case 'trustedHtml':
                                toasty.html = $sce.trustAsHtml(toasty.body);
                                break;
                            case 'template':
                                toasty.bodyTemplate = toasty.body || mergedConfig['body-template'];
                                break;
                        }

                        scope.configureTimer(toasty);

                        if (mergedConfig['pushTo'] === 'top') {
                            scope.toasties.unshift(toasty);
                            if (mergedConfig['limit'] > 0 && scope.toasties.length > mergedConfig['limit']) {
                                scope.toasties.pop();
                            }
                        } else {
                            scope.toasties.push(toasty);
                            if (mergedConfig['limit'] > 0 && scope.toasties.length > mergedConfig['limit']) {
                                scope.toasties.shift();
                            }
                        }
                        scope.onAdd(toasty);
                    }

                    function setTimeout(toasty, time) {
                        toasty.timeout = $timeout(function() {
                            scope.removeToasty(toasty.id);
                        }, time);
                    }

                    scope.toasties = [];
                    scope.$on('toasty-newToasty', function() {
                        document.getElementById('toasty-sound').play();
                        addToasty(toasty.toasty);
                    });

                    scope.$on('toasty-clearToasties', function() {
                        scope.toasties.splice(0, scope.toasties.length);
                    });
                },
                controller: ['$scope', '$element', '$attrs',
                    function($scope, $element, $attrs) {

                        $scope.stopTimer = function(toasty) {
                            if (toasty.timeout) {
                                $timeout.cancel(toasty.timeout);
                                toasty.timeout = null;
                            }
                        };

                        $scope.restartTimer = function(toasty) {
                            if (!toasty.timeout)
                                $scope.configureTimer(toasty);
                        };

                        $scope.removeToasty = function(id) {
                            var i = 0;
                            for (i; i < $scope.toasties.length; i++) {
                                if ($scope.toasties[i].id === id)
                                    break;
                            }
                            $scope.onRemove($scope.toasties[i]);
                            $scope.toasties.splice(i, 1);
                        };

                        $scope.setType = function(id, type) {
                            var i = 0;
                            for (i; i < $scope.toasties.length; i++) {
                                if ($scope.toasties[i].id === id) {
                                    $scope.toasties[i].type = 'toasty-' + type;
                                }
                            }

                        };

                        // remove all 
                        $scope.removeAll = function() {
                            var i = 0;
                            for (i; i < $scope.toasties.length; i++) {
                                $scope.removeToasty($scope.toasties[i].id);
                            }
                        };

                        // close button click
                        $scope.closeClick = function(toasty) {
                            $scope.removeToasty(toasty.id);
                        }
                        // clickToClose
                        $scope.tapRemove = function(toasty) {
                            if (toasty.config.clickToClose)
                                $scope.removeToasty(toasty.id);
                        }
                        $scope.onAdd = function(toasty) {
                            if (toasty.onAdd && angular.isFunction(toasty.onAdd)) {
                                var toastyId = toasty.id;
                                // add stub methods to reference scope methods
                                toasty.remove = function() {
                                    $scope.removeToasty(toastyId);
                                }
                                toasty.removeAll = function() {
                                    $scope.removeAll();
                                }
                                toasty.setType = function(type) {

                                    $scope.setType(toastyId, type);
                                }
                                // run click handler
                                $scope.$parent.$eval(toasty.onAdd(toasty));
                            }
                        }
                        $scope.onRemove = function(toasty) {
                            if (toasty.onRemove && angular.isFunction(toasty.onRemove)) {
                                $scope.$parent.$eval(toasty.onRemove(toasty));
                            }
                        }
                        $scope.onClick = function(toasty) {
                            if (toasty.onClick && angular.isFunction(toasty.onClick)) {
                                var toastyId = toasty.id;
                                // add stub methods to reference scope methods
                                toasty.remove = function() {
                                    $scope.removeToasty(toastyId);
                                }
                                toasty.removeAll = function() {
                                    $scope.removeAll();
                                }
                                toasty.setType = function(type) {
                                    $scope.setType(toastyId, type);
                                }
                                // run click handler
                                $scope.$parent.$eval(toasty.onClick(toasty));
                            }
                        };
                    }
                ],
                template: '<div id="toasty-container" ng-class="config.position">' +
                    '<audio id="toasty-sound" src="../audio/toasty.wav" preload="auto"></audio>' +
                    '<div ng-repeat="toasty in toasties" class="toasty" ng-click="tapRemove(toasty)" ng-class="toasty.type" ng-mouseover="stopTimer(toasty)" ng-mouseout="restartTimer(toasty)">' +
                    '<button ng-click="closeClick(toasty)" class="toasty-close-button" ng-if="toasty.showClose">&times;</button>' +
                    '<div ng-click="onClick(toasty)" class="toasty-text">' +
                    '<span ng-class="toasty.config.classes.title" ng-bind="toasty.title"></span><br />' +
                    '<span ng-class="toasty.config.classes.msg" ng-bind="toasty.msg"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            };
        }
    ])
    .controller('toasty-controller', function($scope, toasty, $window) {

        $scope.pop = function(options) {
            toasty.pop(options);
        };

        $scope.clear = function() {
            toasty.clear();
        };
    });