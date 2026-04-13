const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Gig = sequelize.define('Gig', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM(
      'web_development',
      'graphic_design',
      'content_writing',
      'video_editing',
      'mobile_development',
      'data_entry',
      'other'
    ),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  delivery_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  freelancer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'gigs',
  timestamps: true
})

module.exports = Gig