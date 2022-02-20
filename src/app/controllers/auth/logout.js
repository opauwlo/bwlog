module.exports = {
  logout: {
    index: async (req, res) => {
      try {
        await res.clearCookie("session-token");
        await res.clearCookie("access_token");
        await res.clearCookie("connect.sid");
        await res.clearCookie("G_AUTHUSER_H");
        await res.clearCookie("G_ENABLED_IDPS");
        await res.clearCookie("lastPage");
        return res.redirect("/");
      } catch (e) {}
    },
  }
};
