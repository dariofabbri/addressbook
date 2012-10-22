define([
	"underscore", 
	"backbone",
	"addressbook/models/contact"], 
	function(_, Backbone, Contact) {
	
	var contacts = Backbone.Collection.extend({

		model: Contact,
		
		url: "/addressbook/api/contacts",
		
		options: {
			
			data: {
				offset: 0,
				limit: 10
			},
			
			page: 1
		},
		
		initialize: function() {
			
			var that = this;
			this.on("destroy", function() {
				that.fetchPage();
			}, this);
		},
		
		parse: function(response) {
			
			this.options.data.offset = response.offset;
			this.options.data.limit = response.limit;
			this.options.records = response.records;
			
			return response.results;
		},
		
		fetchPage: function(options) {

			if(options) {

				_.extend(this.options, options);
			}
			
			if(this.options.page) {
				this.options.data.offset = 
					this.options.data.limit * (this.options.page - 1); 
			}
			
			return this.fetch(this.options);
		}
	});
	
	return contacts;
});