const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  freelancer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gig_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: true
})

module.exports = Order