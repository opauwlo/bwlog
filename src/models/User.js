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
      banner: {
        type: DataTypes.STRING,
        defaultValue: 'https://i.ibb.co/J5zgpmW/jake-weirick-Q-RBVFFXR-g-unsplash.jpg'
        },
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