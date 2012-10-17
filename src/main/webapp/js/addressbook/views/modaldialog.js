define([
	"underscore", 
	"backbone",
	"jquery",
	"text!templates/modaldialog.html"], 
	function(_, Backbone, $, modalDialogTemplate) {
	
	var view = Backbone.View.extend({
		
		tagName: "div",
		
		className: "modal hide fade",
		
		events: {
			"click a#cancel": "doCancel",
			"click a#ok": "doOk",
		},
		
		eventBus: _.clone(Backbone.Events),
		
		render: function() {

			this.$el.html(_.template(modalDialogTemplate));
			return this;
		},
		
		show: function(options) {
			
			this.eventBus.off("modaldialog:cancel");
			this.eventBus.off("modaldialog:ok");
			this.eventBus.on("modaldialog:cancel", options.cancelCallback, options.context);
			this.eventBus.on("modaldialog:ok", options.okCallback, options.context);
			
			this.$el.modal({
				show: true, 
				backdrop: "static"
			});
		},
		
		doCancel: function() {
			
			this.$el.modal("hide");
			this.eventBus.trigger("modaldialog:cancel");
		},
		
		doOk: function() {
			this.$el.modal("hide");
			this.eventBus.trigger("modaldialog:ok");
		}
	});
	
	return view;
});
