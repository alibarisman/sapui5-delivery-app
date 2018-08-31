sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	
	return Controller.extend("App.OrderTracking.controller.Customer", {
		
		customerListItemPress: function(evt) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var context = evt.getSource().getBindingContext("mock");
			var path = context.sPath; //"/collection/0"
			var start = path.lastIndexOf("/") + 1;
			var custNumb = path.substring(start, path.length);
			router.navTo("Order", {custNumb: custNumb});
		},
		
		handleSearch : function (evt) {
			// create model filter
			var filters = [];
			var query = evt.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("customer", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}
		
			// update list binding
			var list = this.getView().byId("customerList");
			var binding = list.getBinding("items");
			binding.filter(filters);
		}

	});

});