const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      foto: DataTypes.STRING,
      descricao: DataTypes.STRING,
      id_user: DataTypes.STRING
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
  }
}
module.exports = User;