module.exports = (srv) => {

  const { peopleRegistrations } = srv.entities;

  srv.before('CREATE', 'participants', async (req) => {

    const eventID = req.data.peopleRegistration_ID;

    const event = await SELECT.one
      .from(peopleRegistrations)
      .where({ ID: eventID });

    if (!event) {
      return req.error(404, "Event not found");
    }

    if (event.availableSeats <= 0) {
      return req.error(400, "No seats available");
    }

    await UPDATE(peopleRegistrations)
      .set({ availableSeats: event.availableSeats - 1 })
      .where({ ID: eventID });

  });
  
srv.before('CREATE', 'participants', async (req) => {

  const { participantsName, email, phone } = req.data;


  if (!participantsName || participantsName.trim() === "") {
    req.error(400, "Participant name is required");
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    req.error(400, "Invalid email format");
  }


  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    req.error(400, "Invalid phone number (must be 10 digits)");
  }

});
};
