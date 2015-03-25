var mongoose = require('mongoose');

// Create the MovieSchema.
var ProductSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true},
  isActive: {type: Boolean, default: false},
  subcategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }

});

mongoose.model('Product', ProductSchema);

// Export the model schema.
module.exports = ProductSchema;