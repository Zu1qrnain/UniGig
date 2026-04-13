const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'resolved', 'dismissed'),
    defaultValue: 'pending'
  },
  reported_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  target_user_id: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  target_gig_id: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}, {
  tableName: 'reports',
  timestamps: true
})

module.exports = Report