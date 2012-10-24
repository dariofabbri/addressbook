define([
	"underscore", 
	"backbone"], 
	function(_, Backbone) {
	
	var pagingCollection = Backbone.Collection.extend({

		offset: 0,
		
		limit: 10,
		
		queryArguments: {},
		
		initialize: function() {
			
			var that = this;
			this.on("destroy", function() {
				that.fetchPage();
			}, this);
		},
		
		parse: function(response) {
			
			this.offset = response.offset;
			this.limit = response.limit;
			this.records = response.records;
			
			return response.results;
		},
		
		fetchPage: function(page, queryArguments, options) {

			// Initialize options object.
			//
			options = options || {};
			options.data = options.data || {};
			
			// Copy query arguments to local object.
			//
			if(queryArguments) {
				this.queryArguments = {};
				var that = this;
				_.each(queryArguments, function(value, key) {
					if(!_.isEmpty(value))
						that.queryArguments[key] = value;
				});
			}
			
			// Copy query arguments to data part of options object,
			//
			_.extend(options.data, this.queryArguments);
			
			// If page number have been passed, update offset.
			//
			if(page) {
				this.offset = this.limit * (page - 1); 
			}

			// Copy offset and limit in options object.
			//
			options.data.offset = this.offset;
			options.data.limit = this.limit;

			// Fetch using filled in options object.
			//
			return this.fetch(options);
		},
		
		hasFilters: function() {
			return ! _.isEmpty(this.queryArguments);
		},
		
		resetFilters: function() {
			
			this.queryArguments = {};
			this.offset = 0;
		}
	});
	
	return pagingCollection;
});