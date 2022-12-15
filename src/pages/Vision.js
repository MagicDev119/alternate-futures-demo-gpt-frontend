import React, { useEffect, useState } from "react"
import io from 'socket.io-client'
import {
  Box,
  Button,
  IconButton,
  Icon,
  CardMedia
} from '@mui/material'
import { FavoriteBorder, ArrowBackIos, Favorite, IosShare, SaveAlt } from '@mui/icons-material'
import defaultThumbnail from '../assets/images/default-thumbnail.png'

const socket = io(process.env.REACT_APP_API_URL)
const Vision = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [openaiResponse, setOpenaiResponse] = useState('')
  useEffect(() => {
    if (socket) {
      socket.on('generated', (data) => {
        console.log(data)
        setVideoUrl(data.fileName)
      })

      socket.on('openai', (data) => {
        console.log('--------------openai : ')
        console.log(data)
        setOpenaiResponse((data.choices && data.choices[0]) ? data.choices[0].text : 'empty request')
      })

      socket.emit('videogenerate', {
        inputaudio: window.localStorage.getItem('inputaudio')
      })


      socket.emit('openai', {
        inputaudio: window.localStorage.getItem('inputaudio'),
        inputtext: window.localStorage.getItem('inputtext'),
        username: window.localStorage.getItem('username')
      })
    }

    return () => {
      socket.off('generated')
      socket.off('changeTimer')
      socket.off('error')
      socket.off('setVisionData')
    }
  }, [])
  return (
    <>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - The image of your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem' }}>
        <img
          src={defaultThumbnail}
          loading="lazy"
          className='img-list'
        />
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - The plan to achieve your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem' }}>
        {(openaiResponse !== '') ? openaiResponse : 'Loading...'}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - The video animation of your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', paddingBottom: '2rem' }}>
        {(videoUrl !== '') ? <CardMedia
          component="video"
          autoPlay
          muted
          loop
          playsinline='true'
          src={(videoUrl && videoUrl.slice(0, 4) === 'http') ? videoUrl : process.env.REACT_APP_API_URL + videoUrl.slice(1)}
        /> : 'Loading...'}
      </Box>
    </>
  )
}
export default Vision