Angular Toasty
=================
**Angular Toasty** is a simple standalone AngularJS module with extensive features that provides growl-style alerts and messages for your app.

#### Demo

[Check it out!](http://teamfa.com/angular-toasty/example/)

#### Current Features
* 3 Themes (Default, Material Design & Bootstrap 3)
* Global/Individual timeouts
* Shaking Toasts
* Toaster sound
* onAdd, onRemove & onClick event handlers
* Event broadcasting
* Positioning
* HTML allowed

#### Installation
###### Install from Bower:

```HTML
bower install angular-toasty
```
###### Add dependancies to HTML (AngularJS required)

```HTML
<link href="./bower_components/angular-toasty/dist/angular-toasty.min.css" rel="stylesheet" />

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
<script src="./bower_components/angular-toasty/dist/angular-toasty.min.js"></script>
```

###### Add the toasty module to your Angular app:

```javascript
angular.module('app', ['angular-toasty']);
```

###### Add the toasty directive:

```HTML
		<toasty></toasty>
	</body>
</html>
```

###### Inject and use the toasty service in your controllers:

```javascript
angular.module('app').controller('UserCtrl', ['$scope', 'toasty', function($scope, toasty) {
	$scope.addUser = function(user) {
		// ...
		// Add user
		// ...
		toasty.success({
			title: 'User added!',
			msg: user.firstName + ' has been added!'
		});
}]);
```

> Each toast must have at least a title or message.

#### Configuration

The default toasty config:

```
* limit: 5, // {int} Maximum number of toasties to show at once
showClose: true, // {bool} Whether to show the 'X' icon to close the toasty
clickToClose: false, // {bool} Whether clicking the toasty closes it
* position: 'bottom-right', // {string:bottom-right,bottom-left,top-right,top-left,top-center,bottom-center} The window position where the toast pops up
timeout: 5000, // {int} How long (in miliseconds) the toasty shows before it's removed. Set to false to disable.
sound: true, // {bool} Whether to play a sound when a toast is added
html: false, // {bool} Whether HTML is allowed in toasts
shake: false, // {bool} Whether to shake the toasts
theme: 'default' // {string} What theme to use; default, material or bootstrap
```
> Config items marked with * cannot be overridden at an individual level

##### Global Overrides

To globally override the above config, simply inject the toastyProvider into your app at config:

```javascript
angular.module('app').config(['toastyConfigProvider', function(toastyConfigProvider) {
	toastyConfigProvider.setConfig({
		sound: false,
		shake: true
	});
}]);
```

> You can also get the global config at any time by calling `toasty.getGlobalConfig()`!

##### Individual Overrides

To override the global config for individual toasts, simply pass them into the creation object:

```javascript
toasty({
	title: 'Ping!',
	msg: '<a href="http://google.com">Take me to Google!</a>',
	showClose: false,
	clickToClose: true,
	timeout: 10000,
	sound: false,
	html: true,
	shake: true,
	theme: 'bootstrap'
});
```

#### Features

##### Clearing/Removing

You can easily clear/remove a toast from the view by calling the `clear` method. To remove all at once, just call the method with no ID.

```
toasty.clear(); // Clear all 
toasty.clear(id); // Remove a single toast by it's ID
```

##### Toast Types

There's multiple types of toast to use:

```javascript
toasty(); // Default
toasty.info();
toasty.success();
toasty.wait();
toasty.error();
toasty.warning();
```

To create a "quick toast", just pass a string or integer to the function instead:

```javascript
toasty('Quick Toast!');
toasty.success('Quick Success Toast!');
```

##### Event Handlers & Broadcasting

You can easily hook into individual toast item events by calling a functions:

```javascript
toasty({
	title: 'New Toast!',
	onAdd: function() {
		console.log('Toasty ' + this.id + ' has been added!', this);
	},
	onRemove: function() {
		console.log('Toasty ' + this.id + ' has been removed!', this);
	},
	onClick: function() {
		console.log('Toasty ' + this.id + ' has been clicked!', this);
	}
});
```

Toasty also broadcasts on events which can be hooked into:

```javascript
// When a new toast is added
$rootScope.$on('toasty-added', function(event, toast) { console.log(toast) });
// When a toast is clicked
$rootScope.$on('toasty-clicked', function(event, toast) { console.log(toast) });
// When a toast is cleared/removed
$rootScope.$on('toasty-cleared', function(event, toast) { console.log(toast) });
```

#### Contributing

Please see the [contributing guidelines](https://github.com/teamfa/angular-toasty/blob/master/CONTRIBUTING.md).
