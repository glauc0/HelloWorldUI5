sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    'use strict';

    return ManagedObject.extend("eggo.helloworldui5.controller.BtnFragment", {
        constructor: function (oView) {
            this._oView = oView
        },

        exit: function () {
            delete this._oView;
        },

        open: function () {
            var oView = this._oView;

            // create the dialog
            if (!oView.byId("fragmentDialog")) {
                var oFragmentController = {
                    onClosing: function () {
                        oView.byId("fragmentDialog").close();
                    }
                }

                // load asynchronous XML Fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "eggo.helloworldui5.view.BtnFragment",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect dialog to the root view of the component (model, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                oView.byId("fragmentDialog").open();
            }
        }
    })
});