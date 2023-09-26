import express from 'express';
import multer from 'multer';
import Video from './model/Videos.js';
import connectToDb from './connection/db.js';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key:  process.env.CLOUD_API,
  api_secret:  process.env.CLOUD_SEC,
});

app.use(
  cors({
    origin: [''],
    methods: ['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true,
  })
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

connectToDb(); // Establish MongoDB connection 

app.post('/upload', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  const { title, description } = req.body;
  const thumbnailFile = req.files['thumbnail'][0].buffer;
  const videoFile = req.files['video'][0].buffer;

  try {
    const thumbnailResult = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, imgresult) => {
      // Handle Cloudinary thumbnail upload response

      if (error) {
        console.error('Error uploading thumbnail:', error);
        return res.status(500).json({ error: 'An Error occurred' });
      }
       try {
        const videoResult = await cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
          // Handle Cloudinary video upload response

          if (error) {
            console.error('Error uploading video:', error);
            return res.status(500).json({ error: 'An Error occurred' });
          }

          // Create a new Video instance with all fields
          const newVideo = new Video({
            title,
            description,
            thumbnailUrl: imgresult.secure_url,
            videoUrl: result.secure_url,
          });

          // Save the new Video instance to MongoDB
          await newVideo.save();

          // console.log('Video Upload Result:', result);
        }).end(videoFile);

        console.log('Video Upload Process Complete');
      } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({ error: 'An Error occurred' });
      }

      console.log('Thumbnail Upload Process Complete');

      res.status(200).json({ message: 'Upload Successful' });
    }).end(thumbnailFile);

    console.log('Thumbnail Upload Process Complete');
  } catch (error) {
    console.error('Error Uploading data', error);
    res.status(500).json({ error: 'An Error occurred' });
  }
});

// get videos from mongodb
app.get('/api/videoData',async(req,res)=>{
  try{
    const data=await Video.find().lean()
      res.json(data)
  }catch(err){
res.status(500).json({message:err.message})
  }
}) 


// get the data by id
 
app.get('/api/data/:id', async (req, res) =>  {
  try {
    const videoId = req.params.id;  // Use req.params to get the video ID
    const data = await Video.findById(videoId);  // Use await to wait for the MongoDB query to finish
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}); 


app.listen(3001, () => {
  console.log('Server is running on port 3001'); 
});

 