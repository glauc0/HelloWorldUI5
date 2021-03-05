sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("eggo.helloworldui5.controller.Main", {
      onInit: function () {},

      btnHelloClick: function () {
        var lvText = this.getView().byId("helloLabelInput").getValue();

        if (lvText == "") {
          var oBundle = this.getView().getModel("i18n").getResourceBundle();
          lvText = oBundle.getText("msgW001");
        }
        MessageToast.show(lvText);
        this.getView().byId("helloLabelInput").setValue("");
      },
      btnFragmentClick: function () {
        var oView = this.getView();

        // create the dialog
        if (!this.byId("fragmentDialog")) {
          Fragment.load({
            id: oView.getId(),
            name: "eggo.helloworldui5.view.BtnFragment",
            controller: this,
          }).then(function (oDialog) {
            // connect dialog to the root view of this component (models, lifecycle)
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          this.byId("fragmentDialog").open();
        }
      },
      btnCloseFragmentClick: function () {
        this.byId("fragmentDialog").close();
      },
      btnAcceptClick: function () {
        this.btnHelloClick();
      },
      btnRejectClick: function () {
        this.btnFragmentClick();
      },
    });
  }
);
