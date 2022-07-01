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
      id_user: DataTypes.STRING,
      verify_user:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reports: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      initialAutoIncrement: 1000
    })
  }
  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    this.hasMany(models.Textlist, { foreignKey: 'owner', as: 'textlists' });
  }
}
module.exports = User;