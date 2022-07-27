'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      cuisine: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      menu: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.DECIMAL,
      },
      lng: {
        type: Sequelize.DECIMAL,
      },
      phone: {
        type: Sequelize.STRING,
      },
      web: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Details')
  },
}
