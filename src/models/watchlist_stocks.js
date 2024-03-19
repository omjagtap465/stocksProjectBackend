import { Model, DataTypes } from "sequelize";
import config from "../config/config.json" assert { type: "json" };
import { Sequelize } from "sequelize";

const { database, username, password, host, dialect } =
  config[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
export default class WatchlistStock extends Model {
  static associate(models) {
    WatchlistStock.belongsTo(models.Watchlist, {
      foreignKey: "watchlist_id",
      as: "watchlist",
    });
  }
}

WatchlistStock.init(
  {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    market: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    primary_exchange: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    cik: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sequence_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    watchlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      },
    },
  },
  {
    sequelize,
    modelName: "WatchlistStock",
  }
);
