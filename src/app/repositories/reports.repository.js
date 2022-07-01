const Reports = require("../../database/models/Reports");

module.exports = {
  Reports: {
    createReport: async (text_id, user_id) => {
      try {
        const [report, created] = await Reports.findOrCreate({
          where: {
            text_id: text_id,
            user_id: user_id,
          },
          defaults: {
            text_id: text_id,
            user_id: user_id,
            report_count: 1,
          },
        });

        if (!created) {
          await Reports.update({
            count: report[0].dataValues.report_count + 1,
          }, {
            where: {
              id: report[0].dataValues.id,
            }
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};