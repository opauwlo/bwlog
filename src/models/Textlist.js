const { Model, DataTypes } = require('sequelize');

class Textlist extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      slug: DataTypes.STRING,

    }, {
      sequelize
    })
  }
  
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner', as: 'user' });
    this.hasMany(models.Post, { foreignKey: 'textlist_post_owner', as: 'textlist' });
  }
}
module.exports = Textlist;