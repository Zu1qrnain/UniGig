const User = require('./User')
const Gig = require('./Gig')
const Order = require('./Order')
const Review = require('./Review')
const Message = require('./Message')
const Report = require('./Report')

// User -> Gig (one freelancer has many gigs)
User.hasMany(Gig, { foreignKey: 'freelancer_id', as: 'gigs' })
Gig.belongsTo(User, { foreignKey: 'freelancer_id', as: 'freelancer' })

// User -> Order (client)
User.hasMany(Order, { foreignKey: 'client_id', as: 'clientOrders' })
Order.belongsTo(User, { foreignKey: 'client_id', as: 'client' })

// User -> Order (freelancer)
User.hasMany(Order, { foreignKey: 'freelancer_id', as: 'freelancerOrders' })
Order.belongsTo(User, { foreignKey: 'freelancer_id', as: 'freelancer' })

// Gig -> Order
Gig.hasMany(Order, { foreignKey: 'gig_id', as: 'orders' })
Order.belongsTo(Gig, { foreignKey: 'gig_id', as: 'gig' })

// Gig -> Review
Gig.hasMany(Review, { foreignKey: 'gig_id', as: 'reviews' })
Review.belongsTo(Gig, { foreignKey: 'gig_id', as: 'gig' })

// Order -> Review (one order has one review)
Order.hasOne(Review, { foreignKey: 'order_id', as: 'review' })
Review.belongsTo(Order, { foreignKey: 'order_id', as: 'order' })

// User -> Review (client)
User.hasMany(Review, { foreignKey: 'client_id', as: 'givenReviews' })
Review.belongsTo(User, { foreignKey: 'client_id', as: 'client' })

// User -> Review (freelancer)
User.hasMany(Review, { foreignKey: 'freelancer_id', as: 'receivedReviews' })
Review.belongsTo(User, { foreignKey: 'freelancer_id', as: 'freelancerReview' })

// Order -> Message
Order.hasMany(Message, { foreignKey: 'order_id', as: 'messages' })
Message.belongsTo(Order, { foreignKey: 'order_id', as: 'order' })

// User -> Message
User.hasMany(Message, { foreignKey: 'sender_id', as: 'messages' })
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' })

// User -> Report
User.hasMany(Report, { foreignKey: 'reported_by', as: 'reports' })
Report.belongsTo(User, { foreignKey: 'reported_by', as: 'reporter' })

module.exports = { User, Gig, Order, Review, Message, Report }