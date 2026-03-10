
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller,MessageBox)  {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        onCollapseExpandPress() {
            const oSideNavigation = this.byId("sideNavigation"),
                bExpanded = oSideNavigation.getExpanded();

            oSideNavigation.setExpanded(!bExpanded);
        },
        onRegisterPress(oEvent) {
            this.hiddleAllpanels();
            var oPanel = this.byId("_IDGenHBox2");
            oPanel.setVisible(true);
           

            var oButton = oEvent.getSource();


            var oContext = oButton.getBindingContext();


            var odata = oContext.getObject();

            console.log(odata);
            this.selectedEventID = odata.ID;
        },
        RegisterDetails() {
            this.hiddleAllpanels();
            var oPanel = this.byId("Panel2");
            oPanel.setVisible(true);
        },
        viewDetails() {
            this.hiddleAllpanels();
            var oPanel = this.byId("Panel3");
            oPanel.setVisible(true);
        },
        EnterDetails(){
            this.hiddleAllpanels();
            var oPanel=this.byId("Panel4")
            oPanel.setVisible(true);
        },
        hiddleAllpanels() {
            this.byId("_IDGenHBox2").setVisible(false)
            this.byId("Panel2").setVisible(false);
            this.byId("Panel3").setVisible(false);

        },
        onSubmit: function () {
            var participantsName = this.byId("participantsName").getValue();
            var email = this.byId("email").getValue();
            var phone = this.byId("phone").getValue();

            var oModel = this.getView().getModel();

            var oEventContext = oModel.bindList("/participants").create({
                participantsName: participantsName,
                email: email,
                phone: phone,
                peopleRegistration_ID: this.selectedEventID
            });

            console.log(oEventContext);
            
            oEventContext.created().then(()=>{
                MessageBox.success("Details are to be added ")
            }).catch((err)=>{
                 console.error(err);
                MessageBox.error("Error details are not entered");
                console.error("Error details not to be entered :" +err);
                
            });

        }
    });
});