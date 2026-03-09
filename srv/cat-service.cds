using { eventRegistration as db } from '../db/schema';

service eventRegistrationHandler {

entity peopleRegistrations as projection on db.peopleRegistration;
entity participants as projection on db.participants;
    
}
