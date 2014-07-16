Angular Toasty
=================

**Angular Toasty** is a angularjs module that provides growl-style alerts and messages for your angular app with extensive features.

Latest release requires AngularJS v1.2.6 or higher and angular-animate for the CSS3 transformations. 

This module is based on **AngularJS-Toaster** by Jirikavi.

```HTML
bower install angular-toasty
```

#### Current Version 0.1.2
![alt tag](http://i.imgur.com/GniL4GK.png)

#### Current Features
* onClick, onAdd, onRemove event handlers.
* show / hide close button. (showClose)
* enable / disable click to close. (clickToClose)
* success, wait, info, warning & error toast types.
* adjust timeouts.
* toast sounds
* toast position. (bottom-right as default)
* toast add to top/bottom of current toasts.

#### Planned Features
* Toast shaking via css.
* Toast sizes.
* Toggle toast sounds.

I've yet to do the documentation, so please see sample app for several usage examples.

#### Example controller using Toasty:
JS:
```javascript
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
```
HTML:
```HTML
<div ng-controller="myController">
    <div>  
        <button class="btn btn-primary" style="margin: 150px 0 0 150px;" ng-click="pop()">Show toasts</button>
        <br /> 
        <button class="btn btn-danger" style="margin: 10px 0 0 150px;" ng-click="clear()">Clear toasts</button>                 
    </div>
</div>

<!-- Toasty controller, add this to your index page / default template --> 
<div ng-controller="toasty-controller">
	<toasty-container toasty-defaults='{"timeout": 3000, "close-button":true}'></toasty-container>        
</div>
```
