var mongoose = require('mongoose');
const {Schema} = mongoose


const formSchema = new Schema({
    // Name of the form
  formName: { type: String, required: true },
 
    // The form Data
  formData: { type: Object, required: true },
},
   
{
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);