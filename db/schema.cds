using { cuid } from '@sap/cds/common';

namespace eventRegistration;

entity peopleRegistration : cuid {
  eventName:String(260);
  location:String(100);
  date:Date;
  availableSeats:Integer;
  registed:Association to many participants
               on registed.peopleRegistration = $self;
  }
entity participants : cuid {
  peopleRegistration:Association to peopleRegistration;
  participantsName:String(260);
  email:String;
  phone:String(15);
}
