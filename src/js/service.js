angular.module('angular-toasty').factory('toasty', ['$rootScope', 'toastyConfig', function($rootScope, toastyConfig) {

	// Get the global config
	var config = toastyConfig.config;

	/**
	 * Broadcast a new toasty item to the rootscope
	 * @param  {object} options Individual toasty config overrides
	 * @param  {string} type    Type of toasty; success, info, error etc.
	 */
	var toasty = function(options, type) {

		if (angular.isString(options) && options != '' || angular.isNumber(options)) {
			options = {
				title: options.toString()
			};
		}

		if (!options || !options.title && !options.msg) {
			console.error('angular-toasty: No toast title or message specified!');
		} else {
			options.type = type || 'default';
			$rootScope.$broadcast('toasty-new', {config: config, options: options});
		}
	};

	/**
	 * Toasty types
	 */
	
	toasty.default = function(options) { 
		toasty(options);
	};

	toasty.info = function(options) { 
		toasty(options, 'info');
	};

	toasty.wait = function(options) { 
		toasty(options, 'wait');
	};

	toasty.success = function(options) { 
		toasty(options, 'success');
	};

	toasty.error = function(options) { 
		toasty(options, 'error');
	};

	toasty.warning = function(options) { 
		toasty(options, 'warning');
	};

	/**
	 * Broadcast a clear event
	 * @param {int} Optional ID of the toasty to clear
	 */

	toasty.clear = function(id) {
		$rootScope.$broadcast('toasty-clear', { id: id });
	};

	/**
	 * Return the global config
	 */

	toasty.getGlobalConfig = function() {
		return config;
	};

	return toasty;

}]);