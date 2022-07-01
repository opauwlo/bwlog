const { Admin } = require("../../repositories/admin.repository");

module.exports = {
  dashboard: {
    index: async (req, res) => {
      const allReports = await Admin.getReports();
      for (let i = 0; i < allReports.length; i++) {
        var report = allReports[i];
        const user = await Admin.getUser(report.user_id);
        const text = await Admin.getText(report.text_id);
        report.user = user;
        report.text = text;
        // add to array
        allReports[i] = report;
      } 
      const countPosts = await Admin.countPosts();    
      return res.render("pages/admin/", {
        title: "Dashboard",
        reports: allReports,
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },
  },
};