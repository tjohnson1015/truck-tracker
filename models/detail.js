'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.User)
      Detail.hasMany(models.Favorite)
    }
  }
  Detail.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      picture: DataTypes.STRING,
      menu: DataTypes.STRING,
      description: DataTypes.STRING,
      cuisine: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      phone: DataTypes.STRING,
      web: DataTypes.STRING,
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Detail',
    }
  )
  return Detail
}
