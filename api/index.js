import express from 'express';
import multer from 'multer';
import Video from './model/Videos.js';
import connectToDb from './connection/db.js';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: 'do4dpdezz',
  api_key: '824783255527469',
  api_secret: 'DhNl9vRyMnXoCtRhC3bKLb0H23I',
});

app.use(
  cors({
    origin: ['http://localhost:3000'],
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

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
