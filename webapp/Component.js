sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"App/OrderTracking/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("App.OrderTracking.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			jQuery.sap.require("sap.ui.core.routing.HashChanger");
			
			//call createContent
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
			
			this._router = this.getRouter();
			
			//initlialize the router
			this._routeHandler = new sap.m.routing.RouteMatchedHandler(this._router);
			this._router.initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		
		createContent: function() {
		
			var oView = sap.ui.view({
				id: "app",
				viewName: "App.OrderTracking.view.App",
				type: "XML",
				viewData: {
					component: this
				}
			});
			
			var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
			oView.setModel(oModel,"mock");
			
			return oView;
			
		}
	});
});