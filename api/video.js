import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'do4dpdezz',
    api_key: '824783255527469',
    api_secret: 'DhNl9vRyMnXoCtRhC3bKLb0H23I',
  });

  
 const file="./jj/vid.mp4"

 async function run(){
    try{
const res=await cloudinary.uploader.upload(file,{resource_type:'video'})
console.log(res)
    }catch(err){
        console.log(err)
    }
 }
 run()