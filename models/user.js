// const bcrypt = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
// const crypto = require('crypto')  
// const knex = require('../knexfile');

// const signup = (request, response) => {
//     const user = request.body
//     hashPassword(user.password)
//       .then((hashedPassword) => {
//         delete user.password
//         user.password_digest = hashedPassword
//       })
//       .then(() => createToken())
//       .then(token => user.token = token)
//       .then(() => createUser(user))
//       .then(user => {
//         delete user.password_digest
//         response.status(201).json({ user })
//       })
//       .catch((err) => console.error(err))
//       // console.error(error);
//   }
//   const hashPassword = (password) => {
//     return new Promise((resolve, reject) =>
//       bcrypt.hash(password, 10, (err, hash) => {
//         err ? reject(err) : resolve(hash)
//       })
//     )
//   }
//   const createUser = async(user)=>{
//     const result = await knex("usermanagement.users").insert({
//         username: req.body.username,
//         password: req.body.password,
//     });
//   }
//   const createToken = () => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, data) => {
//         err ? reject(err) : resolve(data.toString('base64'))
//       })
//     })
//   }
//   // don't forget to export!
//   module.exports = {
//     signup,
//   }
// const findUser = (userReq) => {
//     return database.raw("SELECT * FROM users WHERE username = ?", [userReq.username])
//       .then((data) => data.rows[0])
//   }
  
//   const checkPassword = (reqPassword, foundUser) => {
//     return new Promise((resolve, reject) =>
//       bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
//           if (err) {
//             reject(err)
//           }
//           else if (response) {
//             resolve(response)
//           } else {
//             reject(new Error('Passwords do not match.'))
//           }
//       })
//     )
//   }
  
//   const updateUserToken = (token, user) => {
//     return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token", [token, user.id])
//       .then((data) => data.rows[0])
//   }
const express = require("express");
const router = express.Router();
module.exports.getUserByUsername =function(username, callback){
    const query ={username:username};
    username.findOne(query, callback);
}
  
module.exports.getUserById =function(id, callback){
    username.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}
module.exports = router;