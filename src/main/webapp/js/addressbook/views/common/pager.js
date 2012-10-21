define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/common/pager.html"], 
	function(_, Backbone, $, pagerTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		className: "row",
		
		events: {
			"click a.page-goto": "gotoPage"
		},
		
		baseUrl: "#",
		
		buttonsShown: 5,
		
		initialize: function(options) {
			
			this.collection.on("reset", this.render, this);
			
			if(options.baseUrl)
				this.baseUrl = options.baseUrl;
			
			if(options.buttonsShown)
				this.buttonsShown = options.buttonsShown;
		},
		
		render: function() {

			this.$el.html(_.template(pagerTemplate, { 
				collection: this.collection,
				buttonsShown: this.buttonsShown
			}));
			return this;
		},
		
		gotoPage: function(e) {
			
			e.preventDefault();
			
			var page = $(e.target).attr("id");
			Backbone.history.navigate(this.baseUrl + page, true);
		}
	});
	
	return view;
});