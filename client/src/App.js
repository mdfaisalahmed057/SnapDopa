import React, { useState } from 'react';

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
    },{
      path: "/video/:id",
      element: <VideoPlay />,
    }
    ]);
    
   return (
      <div className=''>
         <RouterProvider router={router} />
      </div>
   )
}

export default App;