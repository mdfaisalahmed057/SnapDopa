import React, { useState } from 'react';
import axios from 'axios';
function Upload({handleclose}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('thumbnail', thumbnailFile);
        formData.append('video', videoFile);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:3001/upload', formData);
            setLoading(true)
            handleclose()
         } catch (error) {
            console.error('Error uploading data:', error);
        }
        setTitle("")
        setDescription("")
        setThumbnailFile(null)
        setVideoFile(null)
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          {!loading && <div className='text-center'>
            <div role='status'>
              <svg
                aria-hidden='true'
                className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>}
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
