import mongoose from "mongoose";

function connecToDb(){
    mongoose.connect(process.env.MONGODB_URL, {  
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