
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
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
        EnterDetails() {
            this.hiddleAllpanels();
            var oPanel = this.byId("Panel4")
            oPanel.setVisible(true);   
        },
        hiddleAllpanels() {
            this.byId("_IDGenHBox2").setVisible(false)
            this.byId("Panel2").setVisible(false);
            this.byId("Panel3").setVisible(false);
            // this.byId("Panel4").setVisible(true);
        },
        onSubmit: function () {
            var participantsName = this.byId("participantsName").getValue();
            var email = this.byId("email").getValue();
            var phone = this.byId("phone").getValue();
            var oModel = this.getView().getModel();

            var valid = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if(!valid.test(phone)){
                sap.m.MessageBox.error("phone number is not valid ")
                return ;
            }


            if (participantsName=="" ||email==""|| phone =="" ) {
                sap.m.MessageBox.error("Please fill all fields");
                return

            }
            var regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
            if (!regx.test(email)) {

                sap.m.MessageBox.error("Invalid Email");

                return; // stop execution
            }


            var participantsName = this.byId("participantsName").getValue();

            var oEventContext = oModel.bindList("/participants").create({
                participantsName: participantsName,
                email: email,
                phone: phone,
                peopleRegistration_ID: this.selectedEventID

            });
            console.log(oEventContext);
            oEventContext.created().then(() => {
                MessageBox.success("Details are to be added ");
                participantsName = this.byId("participantsName").setValue(null);
                email = this.byId("email").setValue(null);
                phone = this.byId("phone").setValue(null);

            }).catch((err) => {
                console.error(err);
                MessageBox.error("Error details are not entered");
                console.error("Error details not to be entered :" + err);

            });
        }
    });
});
