sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"App/OrderTracking/util/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("App.OrderTracking.controller.Order", {
		formatter:formatter,

		onInit: function() {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		
		_handleRouteMatched: function(evt) {
		
			if("Order" !== evt.getParameter("name") && "OrderDetail" !== evt.getParameter("name")){
				return;
			} 
			
			this.custNumb = evt.getParameter("arguments").custNumb;
			var context = sap.ui.getCore().byId("app").getModel("mock").getContext("/collection/" + this.custNumb + "/");
			this.getView().setBindingContext(context,"mock");
			
			var list = this.getView().byId("orderList");
			var orderNumb = evt.getParameter("arguments").orderNumb;
			
			if(orderNumb !== undefined) {
				setTimeout(function() {
					var selectedItem = list.getItems()[orderNumb];
					list.setSelectedItem(selectedItem);
				},100);
			}
		},
		
		handleSearch : function (evt) {
			// create model filter
			var filters = [];
			var query = evt.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("ordername", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("orderList");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},
	
		orderListItemPress: function(evt) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var context = evt.getSource().getBindingContext("mock");
			var sPath = context.sPath; //"/collection/0"
			var start = sPath.lastIndexOf("/") + 1;
			var orderNumb = sPath.substring(start, sPath.length);
			router.navTo("OrderDetail", {custNumb: this.custNumb, orderNumb: orderNumb});
		},
	
		goBack: function() {
			this.getOwnerComponent().getRouter().navTo("Customer");
		}

	});

});