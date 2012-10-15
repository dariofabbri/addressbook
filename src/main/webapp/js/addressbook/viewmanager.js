define(function() {

	var instance = null;
	
	function ViewManager() {
		
		if(instance !== null) {
			throw new Error("ViewManager singleton pattern broken!");
		}
		
		this.initialize();
	};
	
	ViewManager.prototype = {

		initialize: function() {
			
			this.views = {};
		},
		
		alive: function() {
			
			console.log("I am alive!");
		}
	};
	
	ViewManager.getInstance = function () {
		
		if(instance === null) {
			instance = new ViewManager(); 
		}
		return instance;
	};
	
	return ViewManager.getInstance();
});