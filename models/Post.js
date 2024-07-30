const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define(
	'post',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Post;
