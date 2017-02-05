console.log('MENU MODEL IS ON!');
// require mongoose
import mongoose from 'mongoose'
// create the schema
const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  name: String,
  price: Number,
  vegan: Boolean,
  _store: {type: Schema.Types.ObjectId, ref: 'Store'},
}, {
  timestamps: true
});
// register the schema as a model
export default mongoose.model('Menu', MenuSchema);