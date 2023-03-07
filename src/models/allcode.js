'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      //The A.hasOne(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the target model (B).
      //The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
      //The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, with the foreign key being defined in the target model (B).
      Allcode.hasMany(models.User, { foreignKey: 'positionid', as: 'positionData'})
      //1 ma code co trong nhieu user
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData'})
    }
  };
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};