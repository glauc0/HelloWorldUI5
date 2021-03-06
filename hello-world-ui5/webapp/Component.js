sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"eggo/helloworldui5/model/models",
	"./controller/BtnFragment"
], function (UIComponent, Device, models, BtnFragment) {
	"use strict";

	return UIComponent.extend("eggo.helloworldui5.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// set dialog
			this._btnFragment = new BtnFragment(this.getRootControl());
		},

		exit: function(){
			this._btnFragment.destroy();
			delete this._btnFragment;
		},

		openFragment: function(){
			this._btnFragment.open();
		}
	});
});
