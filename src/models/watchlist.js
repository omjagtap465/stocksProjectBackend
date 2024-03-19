import { Model, DataTypes } from "sequelize";
import config from "../config/config.json" assert { type: "json" };
import { Sequelize } from "sequelize";
const { database, username, password, host, dialect } =
  config[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
export default class Watchlist extends Model {
  static associate(models) {
    Watchlist.hasMany(models.WatchlistStock, {
      as: "WatchlistStock",
      foreignKey: "watchlist_id",
    });
  }
}

Watchlist.init(
  {
    watchlist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Watchlist",
  }
);
