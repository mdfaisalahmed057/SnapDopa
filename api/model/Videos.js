import  {model} from "mongoose";
import {Schema} from "mongoose";
 const videoScheme = new Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String
});

const Video =  model('snapdopes', videoScheme);

export default Video;
  