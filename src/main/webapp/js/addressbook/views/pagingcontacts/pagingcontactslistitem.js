define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/pagingcontacts/pagingcontactslistitem.html"], 
	function(_, Backbone, $, itemTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "tr",
		
		events: {
			"click a#remove": "removeItem",
			"click a#edit": "editItem"
		},
		
		render: function() {
			
			this.$el.append(_.template(itemTemplate, this.model.toJSON()));
			return this;
		},
		
		removeItem: function() {

			application.modalDialog.show({
				title: "Warning",
				message: "Do you confirm the deletion of the specified contact?",
				okCaption: "Yes",
				cancelCaption: "No",
				okCallback: this.doRemoveItem,
				cancelCallback: this.cancelRemoveItem,
				context: this
			});
		},
		
		editItem: function() {
			Backbone.history.navigate("PagingContactsEdit/" + this.model.id, true);
		},
		
		cancelRemoveItem: function() {
			
		},
		
		doRemoveItem: function() {
			
			this.model.destroy();
			this.remove();
		}
	});
	
	return view;
});
