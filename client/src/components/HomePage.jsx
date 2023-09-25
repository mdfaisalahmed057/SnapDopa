import React from 'react'
import { useState,useEffect } from 'react';
import ReactPlayer from 'react-player';
import Videoplay from './Videoplay';

function HomePage() {
    const[data,setData]=useState([])
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    const openModal = (videoUrl, videoId) => {
      setSelectedVideoUrl(videoUrl);
      setModalOpen(true);
      setSelectedVideo(videoId);
    };

    const handleVideoClick = (videoId) => {
      setSelectedVideoId(videoId);
    


    };
  
  
    const closeModal = () => {
      setSelectedVideoUrl('');
      setModalOpen(false);
    };

    const playVideo = (videoUrl) => {
      setSelectedVideo(videoUrl);
    };

    useEffect(() => { 
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/videoData');
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      console.log(data)


    return (
       <div className='flex flex-wrap gap-10 justify-between m-10'>
      {data.map((dt, index) => (
        <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-200 p-4 rounded-lg'>
          <div className='relative aspect-w-16 aspect-h-9 cursor-pointer' onClick={() => handleVideoClick(dt._id)}>
            <img src={dt.thumbnailUrl} alt='Thumbnail' className='w-full h-full object-cover rounded-lg' />
            <div className='overlay'> 
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#fff'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 5v14l8-7-8-7z'
                />
              </svg>
            </div>
          </div>
          <div className='mt-2'>
            <h3 className='text-lg font-semibold'>{dt.title}</h3>
          </div>
        </div>
      ))}
      {modalOpen && (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75'>
          <div className='relative aspect-w-16 aspect-h-9'>
            <ReactPlayer url={selectedVideoUrl} controls={true} width='100%' height='100%' />
          </div>
          <button
            className='absolute top-4 right-4 text-white'
            onClick={closeModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      )}
            {selectedVideoId && <Videoplay id={selectedVideoId} />}  {/* Render Videoplay component when video is selected */}

    </div>

    )
}

export default HomePage
