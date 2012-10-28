define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/common/footer.html"], 
	function(_, Backbone, $, footerTemplate) {
	
	var view = Backbone.View.extend({

		events: {
		},
		
		render: function() {

			this.$el.html(_.template(footerTemplate));
			return this;
		}
	});
	
	return view;
});
