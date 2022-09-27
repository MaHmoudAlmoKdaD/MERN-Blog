const bcrypt = require("bcrypt");

module.exports = {
  async hashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  },
};
