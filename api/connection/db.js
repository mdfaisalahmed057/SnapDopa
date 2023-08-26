import mongoose from "mongoose";

function connecToDb(){
    mongoose.connect('mongodb+srv://mdfais2995:WtsOK7vEHuzE3ruf@cluster0.nk7wne2.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
}
 export default connecToDb