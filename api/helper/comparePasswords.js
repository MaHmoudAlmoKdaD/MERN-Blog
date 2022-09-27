const bcrypt = require("bcrypt");

module.exports = {
  async comparePasswords(requestPassword, DBPassword) {
    const validated = await bcrypt.compare(requestPassword, DBPassword);
    return validated;
  },
};
