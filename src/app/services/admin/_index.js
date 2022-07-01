const { dashboard } = require("./dashboard");
const { sendEmail } = require("./send.email");

module.exports = {
  adminController: {
    index: dashboard.index,
  },
};
