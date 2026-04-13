const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  freelancer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  gig_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'reviews',
  timestamps: true
})

module.exports = Review