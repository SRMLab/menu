console.log('STORE MODEL IS ON!');
// require mongoose
import mongoose from 'mongoose'
// create the schema
const Schema = mongoose.Schema;
const StoreSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  _menus: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
}, {
  timestamps: true
});
// register the schema as a model
export default mongoose.model('Store', StoreSchema);