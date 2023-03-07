'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //1user chi co 1 ma allcode
      //targetKey là tham chiếu bản ghi keyMap của bang AllCode
      //ko cos targetKey là thi se tu tha chieu den cot primarykey id cua bang user
      User.belongsTo(models.Allcode, {foreignKey: 'positionid', targetKey:'keyMap', as: 'positionData'});
      User.belongsTo(models.Allcode, {foreignKey: 'gender', targetKey:'keyMap', as: 'genderData'});
      User.hasOne(models.Markdown, { foreignKey: 'doctorId'})
      //quan  he 1-1 vs bang Markdown

      //The A.hasOne(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the target model (B).
      //The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
      //The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, with the foreign key being defined in the target model (B).

    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleid: DataTypes.STRING,
    positionid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};