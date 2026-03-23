const cds = require('@sap/cds');

module.exports = class ParticipantService extends cds.ApplicationService {

  async init() {

    const { peopleRegistrations } = this.entities;

    this.before('CREATE', 'participants', async (req) => {

      const { participantsName, email, phone, peopleRegistration_ID } = req.data;

      // ✅ Field Validation
      if (!participantsName || participantsName.trim() === "") {
        return req.error(400, "Participant name is required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return req.error(400, "Invalid email format");
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phone || !phoneRegex.test(phone)) {
        return req.error(400, "Invalid phone number (must be 10 digits)");
      }

      // ✅ Event Validation
      const event = await SELECT.one
        .from(peopleRegistrations)
        .where({ ID: peopleRegistration_ID });

      if (!event) {
        return req.error(404, "Event not found");
      }

      if (event.availableSeats <= 0) {
        return req.error(400, "No seats available");
      }

      // ✅ Update Seats
      await UPDATE(peopleRegistrations)
        .set({ availableSeats: event.availableSeats - 1 })
        .where({ ID: peopleRegistration_ID });

    });

    return super.init();
  }
};