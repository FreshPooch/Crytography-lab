const users = []

const bcryptjs = require('bcryptjs'); 

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcryptjs.compareSync(password, users[i].hashed)
          if(authenticated) {
            let returned = {...users[i]}; 
            delete returned.hashed; 
            res.status(200).send(returned)
          }
        
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body; 
        
          const salt = bcryptjs.genSaltSync(5); 
          const hashed = bcryptjs.hashSync(password, salt); 
          console.log(hashed); 
        

        let user = {
          username, 
          email,
          firstName,
          lastName,
          hashed

          
        }
      
      users.push(user)
      let userToReturn = {...user}
      delete userToReturn.hashed
      res.status(200).send(userToReturn)
    }
}

