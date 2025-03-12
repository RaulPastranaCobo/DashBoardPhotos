import { useEffect, useState } from 'react'
import Header from './components/header'
import Footer from './components/Footer'
import './styles/styles.scss'
import ImageCard from './components/ImageCard'
import NavBar from './components/NavBar'
import MyPhotos from './views/MyPhotos'
import { Routes, Route, Link, Router } from 'react-router-dom'
import Search from './views/Search'


function App() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  useEffect(()=>{
    const loadImages=async ()=>{
      const imagesData=await fetch(`https://api.unsplash.com/photos/random?count=20&client_id=Ncsrs9QjHqZ89ol6aEM3eDET2WwEkqEDm3OwKJBbG0c`)
      .then((res)=>res.json())
      .catch((err)=>console.log(err))
      setImages(imagesData)
      console.log(imagesData)
      
    }

    loadImages()
  }, [])

  const addImage = (image)=>{
    setSelectedImage([...selectedImage, image]);
  }
  return (
    <>
      
      <Header />
      
      <div className='todo'>
        {
          images.map((image)=>{
            return (<>
              <ImageCard image={image} onAddImage={addImage}></ImageCard>
            </>)
          })
        }
        </div>
      <Footer />
    </>
  )
}

export default App;
