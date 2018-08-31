sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ui/core/routing/History"
], function (Controller, Device, History) {
	"use strict";

	return Controller.extend("App.OrderTracking.controller.OrderDetail", {

		onInit: function() {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
	
		_handleRouteMatched: function(evt) {
			
			if("OrderDetail" !== evt.getParameter("name")){
				return;
			}
			
			this.custNumb = evt.getParameter("arguments").custNumb;
			this.orderNumb = evt.getParameter("arguments").orderNumb;
			
			var context = sap.ui.getCore().byId("app").getModel("mock").getContext("/collection/" + this.custNumb + "/items/order/" + this.orderNumb);
			this.getView().setBindingContext(context,"mock");
			
		},
		
		goBack: function() {
			//this.getOwnerComponent().getRouter().navTo("Order");
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}			
		}

	});

});