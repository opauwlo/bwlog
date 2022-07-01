const { Model, DataTypes } = require("sequelize");

class Reports extends Model {
  static init(sequelize) {
    super.init(
      {
        text_id: DataTypes.NUMBER,
        user_id: DataTypes.NUMBER,
        count: DataTypes.NUMBER,
      },

      {
        sequelize,
      }
    );
  }
}

module.exports = Reports;
