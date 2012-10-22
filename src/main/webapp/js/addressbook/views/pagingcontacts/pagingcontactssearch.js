define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/pagingcontacts/pagingcontactssearch.html"], 
	function(_, Backbone, $, searchTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		events: {
			"click a#search": "search",
			"click a#cancel": "cancel"
		},
		
		render: function() {

			this.$el.html(_.template(searchTemplate, {
				collection: this.collection
			}));
			return this;
		},
		
		initialize: function() {
		},
		
		autofocus: "#firstname",

		search: function() {
						
			var firstName = $("#firstname").val();
			var lastName = $("#lastname").val();
			var phoneNumber = $("#phonenumber").val();

			this.collection.fetchPage(1, {
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber
			}, {
				success: function() {
					Backbone.history.navigate("PagingContactsList", true);		
				}
			});
		},
		
		cancel: function() {
			
			Backbone.history.navigate("PagingContactsList", true);
		}
	});
	
	return view;
});
