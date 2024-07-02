const mongoose = require('mongoose')
const foodItemSchema = new mongoose.Schema({
    label: String,
    brand: String, 
    kcal: Number, 
    quantity: Number, 
    createdAt: { type: Date, default: Date.now }
  });
  const FoodItem = mongoose.model('FoodItem', foodItemSchema);
  module.exports = FoodItem;