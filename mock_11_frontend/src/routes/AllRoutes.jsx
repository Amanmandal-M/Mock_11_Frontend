import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Post from '../pages/Post'
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/post' element={<Post/>} />

      </Routes>
    </div>
  )
}

export default AllRoutes
