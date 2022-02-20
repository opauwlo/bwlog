require("dotenv").config();

// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
  login: {
    index: async (req, res) => {
      try {
        let token = req.body.token;
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          const userid = payload["sub"];
        }
        verify()
          .then(() => {
            res.cookie("session-token", token, {
              overwrite: true,
            });
            res.send("success");
          })
          .catch(console.error);
      } catch (e) {
        res.redirect('/404')
        res.status(500).json({
          message: e,
        });
      }
    },

  }
};
