const LocalStrategy = require('passport-local').Strategy;
const authService = require('../../components/auth/authService');
const bcrypt = require('bcryptjs');

module.exports = new LocalStrategy({ session: false }, async (username, password, callback) => {
  // We use default {username: "catlover", password: "cat", id: 1} to authenticate.
  // You should use database to check for user credentials.
  console.log("vô local")
  const user = await authService.getUserByUsername(username);
  console.log("vô local 1")
  console.log(user);
  console.log("vô local2")
  const nouser = {message: "null"};
  if(!user){
    // callback(null,false);
    console.log("không có user")
    
    callback(null,nouser);
  }else{
    const infoUser = {id:user._id ,username: user.username,name: user.name, phone: user.phone}
    bcrypt.compare(password,user.password, (err,isMatch ) =>{
      if (err) throw err;
              if (isMatch) {
                console.log("user:"+user);
                  callback(null, infoUser)
              } else {
                // callback(null, false);
                console.log("sai mk")
                callback(null,nouser);
              }
  });
  }
  // if (username === 'catlover' && password === 'cat') {
  //   callback(null, { id: 1, username })
  // } else
  //   callback(null, false);
});
