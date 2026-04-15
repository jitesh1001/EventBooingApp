const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },

  eventId: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
    required: true
  },

  tickets: {                    
    type: Number,
    required: true,
    min: 1
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "expired"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["non_paid", "paid", "failed"],
    default: "non_paid"
  },
  
  amount: {
    type: Number,
    required: true
  },


  expiresAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;