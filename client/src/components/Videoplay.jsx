import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

function Videoplay() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [alldata, allSetData] = useState([])
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://videoroute.onrender.com/api/data/${id}`);
        const jsonData = await response.json();
        const dataArray = Object.keys(jsonData).map(key => jsonData[key]);

        setData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  console.log(data[1])

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await fetch('https://videoroute.onrender.com/api/videoData');
        const jsonData = await response.json();
        allSetData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

console.log(alldata)
  // all the data 
  // console.log(data[1])
  return (
    <>
    <Navbar/>
    <div className=''>
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
      <div className='flex'>
        <div className='w-2/3 m-10 rounded-md'>
          <div className='relative aspect-w-16 aspect-h-9 h-80 shadow-lg shadow-gray-900 rounded-md'>
            <ReactPlayer url={data[4]} controls={true} width='100%' height='100%' />
          </div>
          <div className='mt-4'>
            <h2 className='text-xl font-bold'>{data[1]}</h2>
            <p className='text-gray-700 mt-2'>
              {data[2]}
            </p>
          </div>
        </div>

        <div className='w-1/3 mt-10 ml-10'>
          <div className='flex items-center'>
            <img src='https://via.placeholder.com/150' alt='Thumbnail' className='w-16 h-16 rounded-full' />
            <div className='ml-3'>
              <h3 className='text-xl font-bold'>Channel Name</h3>
              <span className='text-gray-700'>123K subscribers</span>
            </div>
          </div>
          <div className='mt-6'>
            <h3 className='text-xl font-bold mb-2'>Recommended Videos</h3>
            <div className='flex flex-col gap-4'>
              {/* Recommended videos go here */}
              <div className='flex items-center flex-col shadow-md shadow-slate-400 '>
                {alldata.map((dt)=>(
                  <div className='relative aspect-w-16 aspect-h-9 m-10'>
                  <ReactPlayer url={dt.videoUrl} controls={true} width='100%' height='100%' />
                  <div className='ml-3'>
                    <h1 className='text-xl font-medium'>{dt.title}</h1>
                    <span className='text-gray-700'>{dt.description}</span>
                  </div>
                </div> 
                ))
                  }              
             
              </div> 
              {/* Repeat this block for each recommended video */}
            </div>
          </div>
        </div>
      </div>
          </div>

      <Footer/>
    </>
  );
}


export default Videoplay

