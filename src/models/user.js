import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };
const { database, username, password, host, dialect } =
  config[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
export default class User extends Model {
  static associate(models) {}
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
