import React from 'react'
import { createRoot } from 'react-dom/client'
import Search from './views/Search.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import MyPhotos from './views/MyPhotos.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  
      <nav>
        <div className='navButtons'>
          <Link to='/search'>Search</Link>
          <Link to='/myphotos'>My Photos</Link>
        </div>
      </nav>
      
    <Routes>
      <Route path='/search' element={<Search />} />
      <Route path='/myphotos' element={<MyPhotos />}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
