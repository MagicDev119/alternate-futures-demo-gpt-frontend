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
  const [txt2imageUrl, setTxt2imageUrl] = useState('')
  const [pdfDownloadUrl, setPdfDownloadUrl] = useState('')
  useEffect(() => {
    if (socket) {
      socket.on('generated', (data) => {
        console.log('--------------generated : ')
        console.log(data)
        setVideoUrl({
          video: data.fileName,
          thumbnail: data.thumbnailUrl
        })

        socket.emit('generatepdf', {
          imgUrl: txt2imageUrl,
          gpt1txt: openaiResponse.gpt_1,
          gpt2txt: openaiResponse.gpt_2,
          thumbImgUrl: data.thumbnailUrl
        })
      })

      socket.on('generatePdf', (data) => {
        setPdfDownloadUrl(data.url)
      })

      socket.on('txt2image', (data) => {
        console.log('--------------txt2image : ')
        console.log(data)
        setTxt2imageUrl(data.fileName)
      })

      socket.on('openai', (data) => {
        console.log('--------------openai : ')
        console.log(data)
        setOpenaiResponse({
          gpt_1: (data.openai1.choices && data.openai1.choices[0]) ? data.openai1.choices[0].text : 'empty request',
          gpt_2: (data.openai2.choices && data.openai2.choices[0]) ? data.openai2.choices[0].text : 'empty request'
        })
      })

      socket.emit('videogenerate', {
        inputaudio: window.localStorage.getItem('inputaudio')
      })

      socket.emit('txt2image', {
        inputtext: window.localStorage.getItem('inputtext')
      })

      socket.emit('openai', {
        inputaudio: window.localStorage.getItem('inputaudio'),
        inputtext: window.localStorage.getItem('inputtext'),
        username: window.localStorage.getItem('username'),
        userprofession: window.localStorage.getItem('user_profession'),
        userhobbies: window.localStorage.getItem('user_hobbies'),
        passions: window.localStorage.getItem('user_passionate')
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
        {(txt2imageUrl !== '') ? <img
          src={(txt2imageUrl && txt2imageUrl.slice(0, 4) === 'http') ? txt2imageUrl : process.env.REACT_APP_API_URL + txt2imageUrl.slice(1)}
          loading="lazy"
          className='img-list'
        /> : 'Loading, your image will appear here (~3 minutes)'}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Story about your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem' }}>
        {(openaiResponse !== '') ? openaiResponse.gpt_1 : 'Loading...'}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Plan to achieve the vision of your future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem' }}>
        {(openaiResponse !== '') ? openaiResponse.gpt_1 : 'Loading...'}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - The video animation of your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', paddingBottom: '2rem' }}>
        {(videoUrl !== '') ? <img
          src={(videoUrl.thumbnail && videoUrl.thumbnail.slice(0, 4) === 'http') ? videoUrl.thumbnail : process.env.REACT_APP_API_URL + videoUrl.thumbnail.slice(1)}
          loading="lazy"
          className='img-list'
        /> : 'Loading, your video will appear here (~10 minutes)'}
        {/* {(videoUrl !== '') ? <CardMedia
          component="video"
          autoPlay
          muted
          loop
          playsinline='true'
          src={(videoUrl && videoUrl.slice(0, 4) === 'http') ? videoUrl : process.env.REACT_APP_API_URL + videoUrl.slice(1)}
        /> : ''} */}
      </Box>
      {(pdfDownloadUrl !== '') && <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        <a href={pdfDownloadUrl} download="w3logo" style="color: #ccc">
          Download PDF
        </a>
        <a href={videoUrl.video} download="w3logo" style="color: #ccc">
          Download Video
        </a>
      </Box>}
    </>
  )
}
export default Vision