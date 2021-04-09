const crypto = require("crypto");

const generateSat = () => crypto.randomBytes(16).toString("base64");
const encryptPassword = (plainText, salt) => {
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
}

const setSaltAndPassword= user => {
  if(user.changed("password")) {
    user.salt = generateSat();
    user.password = encryptPassword(user.password(), user.salt());
  }
}

module.exports = {
  setSaltAndPassword
}