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
      console.log('--=-=-=-=-=')
      socket.on('generated', (data) => {
        console.log('--------------generated : ')
        console.log(data)
        setVideoUrl({
          video: data.fileName,
          thumbnail: data.thumbnailUrl
        })

        socket.emit('generatepdf', {
          imgUrl: window.localStorage.getItem('txt2image'),
          gpt1txt: window.localStorage.getItem('gpt_1'),
          gpt2txt: window.localStorage.getItem('gpt_2'),
          thumbImgUrl: data.thumbnailUrl,
          name: window.localStorage.getItem('username'),
          profession: window.localStorage.getItem('user_profession'),
          hobbies: window.localStorage.getItem('user_hobbies'),
          passions: window.localStorage.getItem('user_passionate'),
          inputaudio: window.localStorage.getItem('inputaudio')
        })
      })

      socket.on('generatePdf', (data) => {
        console.log((data.url && data.url.slice(0, 4) === 'http') ? data.url : process.env.REACT_APP_API_URL + data.url.slice(1))
        setPdfDownloadUrl(data.url)
      })

      socket.on('txt2image', (data) => {
        console.log('--------------txt2image : ')
        console.log(data)
        window.localStorage.setItem('txt2image', data.fileName)
        setTxt2imageUrl(data.fileName)
      })

      socket.on('openai', (data) => {
        console.log('--------------openai : ')
        console.log(data)
        window.localStorage.setItem('gpt_1', (data.openai1.choices && data.openai1.choices[0]) ? data.openai1.choices[0].text : '')
        window.localStorage.setItem('gpt_2', (data.openai2.choices && data.openai2.choices[0]) ? data.openai2.choices[0].text : '')
        setOpenaiResponse({
          gpt_1: (data.openai1.choices && data.openai1.choices[0]) ? data.openai1.choices[0].text : 'empty request',
          gpt_2: (data.openai2.choices && data.openai2.choices[0]) ? data.openai2.choices[0].text : 'empty request'
        })
      })

      socket.emit('videogenerate', {
        inputaudio: window.localStorage.getItem('inputaudio'),
        username: window.localStorage.getItem('username'),
        inputtext: window.localStorage.getItem('inputtext')
      })

      socket.emit('txt2image', {
        inputtext: window.localStorage.getItem('inputtext'),
        inputaudio: window.localStorage.getItem('inputaudio')
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
      socket.off('generatePdf')
      socket.off('txt2image')
      socket.off('openai')
    }
  }, [])

  const handleDownload = (url) => {
    // using Java Script method to get PDF file
    const downloadUrl = url.split('/')
    fetch(url).then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = downloadUrl[downloadUrl.length - 1];
        alink.click();
      })
    })
  }

  return (
    <>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Name: {window.localStorage.getItem('username')}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Profession: {window.localStorage.getItem('user_profession')}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Hobbies: {window.localStorage.getItem('user_hobbies')}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Passionate: {window.localStorage.getItem('user_passionate')}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - Your Vision of the Future: {window.localStorage.getItem('inputaudio')}
      </Box>
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
        {(openaiResponse !== '') ? openaiResponse.gpt_2 : 'Loading...'}
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        - The video animation of your vision of the future
      </Box>
      <Box component="div" sx={{ m: '2rem 1rem', paddingBottom: '2rem' }}>
        {/* {(videoUrl !== '') ? <img
          src={(videoUrl.thumbnail && videoUrl.thumbnail.slice(0, 4) === 'http') ? videoUrl.thumbnail : process.env.REACT_APP_API_URL + videoUrl.thumbnail.slice(1)}
          loading="lazy"
          className='img-list'
        /> : 'Loading, your video will appear here (~10 minutes)'} */}
        {(videoUrl !== '') ? <CardMedia
          component="video"
          autoPlay
          muted
          loop
          playsinline='true'
          src={(videoUrl && videoUrl.slice(0, 4) === 'http') ? videoUrl : process.env.REACT_APP_API_URL + videoUrl.slice(1)}
        /> : ''}
      </Box>
      {(pdfDownloadUrl !== '') && <Box component="div" sx={{ m: '2rem 1rem', color: '#aaa' }}>
        <Box component="span" onClick={() => { handleDownload((pdfDownloadUrl && pdfDownloadUrl.slice(0, 4) === 'http') ? pdfDownloadUrl : process.env.REACT_APP_API_URL + pdfDownloadUrl.slice(1)) }} sx={{ color: '#ccc', cursor: 'pointer' }}>
          Download PDF
        </Box>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Box component="span" onClick={() => { handleDownload((videoUrl.video && videoUrl.video.slice(0, 4) === 'http') ? videoUrl.video : process.env.REACT_APP_API_URL + videoUrl.video.slice(1)) }} sx={{ color: '#ccc', cursor: 'pointer' }}>
          Download Video
        </Box>
      </Box>}
    </>
  )
}
export default Vision