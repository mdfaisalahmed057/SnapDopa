import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Navbar from './Navbar';
import Footer from './Footer';

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const navigate = useNavigate();
 axios.defaults.withCredentials=true
  const openModal = (videoUrl, videoId) => {
    setSelectedVideoUrl(videoUrl);
    setModalOpen(true);
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
    navigate(`/video/${videoId}`);
  };

  const closeModal = () => {
    setSelectedVideoUrl('');
    setModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://snap-dopa-t2bh.vercel.app/api/videoData');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchData();

     const fetchInterval = setInterval(() => {
      fetchData();
    }, 1000);

     return () => clearInterval(fetchInterval);
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex justify-center text-3xl font-bold text-white mb-4'>MeTube</div>       <div className='flex flex-wrap gap-10 justify-between m-10'>
        {loading && (
          <div className='text-center'>
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
          </div>
        )}
        {!loading &&
          data.map((dt, index) => (
            <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-200 p-4 shadow-lg shadow-gray-400 rounded-lg'>
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
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 5v14l8-7-8-7z' />
                  </svg>
                </div>
              </div>
              <div className='mt-2'>
                <h3 className='text-lg font-semibold'>{dt.title}</h3>
                <p>{dt.description}</p>
              </div>
            </div>
          ))}
      </div>
      {modalOpen && (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75'>
          <div className='relative aspect-w-16 aspect-h-9'>
            <ReactPlayer url={selectedVideoUrl} controls={true} width='100%' height='100%' />
          </div>
          <button className='absolute top-4 right-4 text-white' onClick={closeModal}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
