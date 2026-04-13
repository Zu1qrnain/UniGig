const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('client', 'freelancer', 'admin'),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  skills: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  avg_rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00
  },
  is_banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',
  timestamps: true
})

module.exports = User