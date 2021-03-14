sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/table/Column",
    "sap/m/Text",
  ],
  function (
    Controller,
    UIComponent,
    ODataModel,
    History,
    JSONModel,
    Column,
    Text
  ) {
    "use strict";

    return Controller.extend("eggo.helloworldui5.controller.MySql", {
      onInit: function () {
        var oView = this.getView();
        var oDataModel = new ODataModel("http://localhost/", {
          user: "root",
          password: "usbw",
        });

        oDataModel
          .getMetaModel()
          .loaded()
          .then(function () {
            oView.setModel(oDataModel.getMetaModel(), "meta");
          });
        oView.setModel(oDataModel);

        var oTable = oView.byId("tableMySql");
        var oBinding = oTable.getBinding("rows");
        var oBusyIndicator = oTable.getNoData();
        oBinding.attachDataRequested(function () {
          oTable.setNoData(oBusyIndicator);
        });
        oBinding.attachDataReceived(function () {
          oTable.setNoData(null); //use default again ("no data" in case no data is available)
        });
      },
      onExit: function () {},

      columnFactory: function (sId, oContext) {
        var oModel = this.getView().getModel();
        var sName = oContext.getProperty("name");
        var sType = oContext.getProperty("type");
        var iLen = oContext.getProperty("maxLength");
        iLen = iLen ? parseInt(iLen, 10) : 10;

        return new Column(sId, {
          sortProperty: sName,
          filterProperty: sName,
          width: (iLen > 9 ? (iLen > 50 ? 15 : 10) : 5) + "rem",
          label: new sap.m.Label({ text: "{/#Orders/" + sName + "/@name}" }),
          hAlign: sType && sType.indexOf("Decimal") >= 0 ? "End" : "Begin",
          template: new Text({ text: { path: sName } }),
        });
      },
      btnGoBackMain: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("Main", {}, true);
        }
      },
    });
  }
);
