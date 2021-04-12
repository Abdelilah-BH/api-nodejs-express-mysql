const bcrypt = require("bcrypt");

const encryptPassword = (plainText) => {
  return bcrypt.hashSync(plainText, 12);
}

const setPassword= user => {
  if(user.changed("password")) {
    user.password = encryptPassword(user.password());
  }
}



module.exports = {
  setPassword
}