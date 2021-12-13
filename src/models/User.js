const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      user_name: {
        type: DataTypes.STRING,
        unique: false,
      },
      email: DataTypes.STRING,
      profile: DataTypes.STRING,
      banner: DataTypes.STRING,
      profile_id: DataTypes.STRING,
      banner_id: DataTypes.STRING,
      descricao: DataTypes.STRING,
      id_user: DataTypes.STRING
    }, {
      sequelize,
      initialAutoIncrement: 1000
    })
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
  }
}
module.exports = User;