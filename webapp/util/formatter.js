jQuery.sap.declare("App.OrderTracking.util.formatter");

App.OrderTracking.util.formatter = {
	
	_statusStateMap : {
		"Tamamlandı" : "Success",
		"Beklemede" : "Warning",
		"Reddedildi" : "Error"
	},

	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = App.OrderTracking.util.formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	}
	
};