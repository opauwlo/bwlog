require("dotenv").config();

// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
  login: {
    index: async (req, res) => {
      try {
        let token = req.body.credential;
        if (!token) {
          return res.redirect("/login");
        }
        async function verify() {
          try {
            const ticket = await client.verifyIdToken({
              idToken: token,
              audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload["sub"];
          }
          catch (e) {
            console.log(e);
          }
        }
        verify()
          .then(() => {
            // clean session-token cookie
            await res.clearCookie("session-token");
            await res.cookie("session-token", token, {
              httpOnly: true,
              overwrite: true,
            });
            return res.redirect("auth/create");
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
        return res.redirect('/login')
      }
    },

  }
};
