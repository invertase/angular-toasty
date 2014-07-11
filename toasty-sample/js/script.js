angular.module('main', ['ngAnimate', 'toasty'])
    .controller('myController', function($scope, toasty, $timeout, $window) {

        $scope.pop = function() {
            toasty.pop.success({
                title: "Success",
                msg: 'User ABC@def.com added!',
                timeout: 10000,
                showClose: false,
                myData: 'Testing 1 2 3', // you can add any objects as extras 
                onClick: function(toasty) {
                    console.log(toasty.myData);
                    toasty.msg = 'I updated myself';
                    toasty.title = 'A new title!';
                    //toasty.remove();
                    //toasty.removeAll();
                },
                onAdd: function(toasty) {
                    console.log(toasty.id + ' has been added!');
                },
                onRemove: function(toasty) {
                    console.log(toasty.id + ' has been removed!');
                }
            });

            toasty.pop.warning({
                title: 'Warning',
                msg: 'No users found.',
                clickToClose: true
            });

            toasty.pop.wait({
                title: 'Please Wait',
                msg: 'Loading users...',
                timeout: 0,
                clickToClose: false,
                showClose: false,
                onAdd: function(toasty) {
                    console.log(toasty.id + ' has been added!');

                    // after 5 secs changes to success
                    var doSuccess = function() {
                        toasty.title = 'Success';
                        toasty.msg = 'Finished loading users.';
                        //toasty.type = 'toasty-success';
                    }
                    $timeout(doSuccess, 5000);
                },
            });

            toasty.pop.error({
                title: 'Error',
                msg: 'Failed to delete user.',
                clickToClose: true
            });

            toasty.pop.info({
                title: 'Info',
                msg: 'Welcome...',
                clickToClose: true
            });

        };

        $scope.clear = function() {
            toasty.clear()
        };

    });