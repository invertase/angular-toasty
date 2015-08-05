angular.module('angular-toasty').provider('toastyConfig', function() {

	/**
	 * Default global config
	 * @type {Object}
	 */
	var object = {
		limit: 5,
		showClose: true,
		clickToClose: false,
		position: 'bottom-right',
		timeout: 5000,
		sound: true,
		html: false,
		shake: false,
		theme: 'default'
	};

	/**
	 * Over-ride config
	 * @type {Object}
	 */
	var updated = {};

	return {
		setConfig: function(override) {
			updated = override;
		},
		$get: function() {
			return {
				config: angular.extend(object, updated)
			}
		}
	}
});