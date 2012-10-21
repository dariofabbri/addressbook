define([
	"underscore", 
	"backbone",
	"addressbook/models/contact"], 
	function(_, Backbone, Contact) {
	
	var contacts = Backbone.Collection.extend({

		model: Contact,
		
		url: "/addressbook/api/contacts",
		
		offset: 0,
		
		limit: 10,
		
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
		
		fetchPage: function(page) {
			
			if(page) {
				this.offset = this.limit * (page - 1); 
			}

			var options = {
				data: {
					offset: this.offset
				}	
			};

			return this.fetch(options);
		}
	});
	
	return contacts;
});