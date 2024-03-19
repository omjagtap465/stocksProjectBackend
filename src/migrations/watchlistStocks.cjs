"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WatchlistStocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      market: {
        type: Sequelize.STRING,
      },
      primary_exchange: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cik: {
        type: Sequelize.INTEGER,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      sequence_no: {
        type: Sequelize.STRING,
      },
      watchlist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Watchlists",
          key: "id",
          as: "watchlist_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("WatchlistStocks");
  },
};
