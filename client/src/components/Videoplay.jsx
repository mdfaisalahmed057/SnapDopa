import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function Videoplay({ id }) {
    const [data, setData] = useState([])
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/data/${id}`);
                const jsonData = await response.json();
                 setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

console.log(data)


    return (
 
        <>
            <Navbar />
            <div className='flex'>
                { data.map((dt) => (
                    <div className='w-2/3 mt-10 mx-10'> 
                        <div className='relative aspect-w-16 aspect-h-9 h-80'>
                            <ReactPlayer url={dt.videoUrl} controls={true} width='100%' height='100%' />
                        </div>
                        <div className='mt-4'>
                            <h2 className='text-xl font-bold'>{dt.title}</h2>
                            <p className='text-gray-700 mt-2'>
                                {dt.description}
                            </p>
                        </div>
                    </div>
                ))}
                
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
                      <div className='flex items-center'>
                        <img src='https://via.placeholder.com/100' alt='Thumbnail' className='w-16 h-9' />
                        <div className='ml-3'>
                          <h4 className='font-medium'>Video Title</h4>
                          <span className='text-gray-700'>Channel Name</span>
                        </div>
                      </div>
                      {/* Repeat this block for each recommended video */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
        
 
export default Videoplay
