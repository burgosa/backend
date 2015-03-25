var mongoose = require('mongoose');

// Create the MovieSchema.
var CategorySchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true},
  isActive: {type: Boolean, default: false},
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }]

});

mongoose.model('Category', CategorySchema);

// Export the model schema.
module.exports = CategorySchema;