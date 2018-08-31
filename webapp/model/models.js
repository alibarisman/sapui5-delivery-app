
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var deviceModel = new sap.ui.model.json.JSONModel({
				isPhone : Device.browser.mobile,
				listMode : (Device.browser.mobile) ? "None" : "SingleSelectMaster",
				listItemType : (Device.browser.mobile) ? "Active" : "Inactive"
			});
			
			return deviceModel;
		}

	};
});