import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import VideoPlay from './components/Videoplay';
import HomePage from './components/HomePage';

import {
   createBrowserRouter,
   RouterProvider,
   Route,
   Outlet,
} from "react-router-dom";

function App() {
   const router = createBrowserRouter([
      {
         path: "/",
         element: <HomePage />,
         children: [

            {
               path: "/video/:id",
               element: <VideoPlay />,
            },

         ],
      },

   ]);
   return (
      <div className=''>
         <RouterProvider router={router} />
      </div>
   )
}

export default App;