import React, { useState } from 'react';
import axios from 'axios';
function Upload({handleclose}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('thumbnail', thumbnailFile);
        formData.append('video', videoFile);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:3001/upload', formData);
            // Sending data to NodeJS backend  
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
  <form className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
    <h1 className='text-xl font-bold mb-4'>Upload Video</h1>
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>Description</label>
      <textarea
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='thumbnail'>Select Thumbnail</label>
      <input type='file' accept='image/*' onChange={(e) => setThumbnailFile(e.target.files[0])} />
    </div>
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='video'>Select Video</label>
      <input type='file' accept='video/*' onChange={(e) => setVideoFile(e.target.files[0])} />
    </div>
    <button
      onClick={handleUpload}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    >
      Upload
    </button>
    <button
      onClick={handleclose}
      className='bg-red-400 ml-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    >
      cancel
    </button>
  </form>
</div>

    )
}

export default Upload
