var mongoose = require('mongoose');

// Create the MovieSchema.
var SubcategorySchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true},
  isActive: {type: Boolean, default: false},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' }

});

mongoose.model('Subcategory', SubcategorySchema);

// Export the model schema.
module.exports = SubcategorySchema;