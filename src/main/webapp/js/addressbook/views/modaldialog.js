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
		
		render: function() {

			this.$el.html(_.template(modalDialogTemplate));
			return this;
		},
		
		show: function(options) {
			
			// Set up events binding.
			///
			this.off("modaldialog:cancel");
			this.off("modaldialog:ok");
			this.on("modaldialog:cancel", options.cancelCallback, options.context);
			this.on("modaldialog:ok", options.okCallback, options.context);
			
			// Render the template passing the captions.
			//
			var captions = {
				title: options.title || "Undefined title",
				message: options.message || "Undefined message",
				okCaption: options.okCaption || "OK",
				cancelCaption: options.cancelCaption || "Cancel"
			};
			this.$el.html(_.template(modalDialogTemplate, captions));
			
			// Show the modal dialog.
			//
			this.$el.modal({
				show: true, 
				backdrop: "static"
			});
		},
		
		doCancel: function() {
			
			this.$el.modal("hide");
			this.trigger("modaldialog:cancel");
		},
		
		doOk: function() {
			this.$el.modal("hide");
			this.trigger("modaldialog:ok");
		}
	});
	
	return view;
});
