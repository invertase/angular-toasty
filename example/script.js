angular.module('toasty-example', ['angular-toasty'])

angular.module('toasty-example').controller('ExampleController', ['$scope', 'toasty', function($scope, toasty) {

	/**
	 * !! This code is only for the angular-toasty demo !!
	 * !! Please checkout the src directory for the module code !!
	 */
	
	$scope.button = 'ping';

	$scope.themes = [{
		name: 'Default Theme',
		code: 'default'
	}, {
		name: 'Material Design',
		code: 'material'
	}, {
		name: 'Bootstrap 3',
		code: 'bootstrap'
	}];

	$scope.types = [{
		name: 'Default',
		code: 'default',
	}, {
		name: 'Info',
		code: 'info'
	}, {
		name: 'Success',
		code: 'success'
	}, {
		name: 'Wait',
		code: 'wait'
	}, {
		name: 'Error',
		code: 'error'
	}, {
		name: 'Warning',
		code: 'warning'
	}];

	$scope.options = {
		title: 'Toast It!',
		msg: 'Mmmm, tasties...',
		showClose: true,
		clickToClose: false,
		timeout: 5000,
		sound: true,
		html: false,
		shake: false,
		theme: $scope.themes[0].code,
		type: $scope.types[0].code
	};

	$scope.newToast = function() {

		$scope.button = $scope.button == 'ping' ? 'pong' : 'ping';

		toasty[$scope.options.type]({
			title: $scope.options.title,
			msg: $scope.options.msg,
			showClose: $scope.options.showClose,
			clickToClose: $scope.options.clickToClose,
			sound: $scope.options.sound,
			shake: $scope.options.shake,
			timeout: $scope.options.timeout || false,
			html: $scope.options.html,
			theme: $scope.options.theme,
			onAdd: function() {
				console.log('Toasty ' + this.id + ' has been added!');
			},
			onRemove: function() {
				console.log('Toasty ' + this.id + ' has been removed!');
			},
			onClick: function() {
				console.log('Toasty ' + this.id + ' has been clicked!');
			}
		});
	};

	$scope.clearToasties = function() {
		toasty.clear();
	};

}]);