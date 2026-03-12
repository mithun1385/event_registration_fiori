const cds = require('@sap/cds');

module.exports = class eventRegistrationHandler extends cds.ApplicationService{

    init(){

        const { peopleRegistrations,participants} = this.entities


        this.on('CREATE','participants',async(req,next)=>{

            const email = req.data.email
            console.log(email);
            
            const regx= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          if(!regx.test(email)){
            return req.error(400,"Invaid email ")
          }
          return next();
        })
 

        return super.init()
    }
}