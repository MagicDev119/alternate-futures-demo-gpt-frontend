import React, { useEffect, useState } from "react"
import HeaderBar from '../../components/HeaderBar'
import {
  Box,
  Button,
  IconButton,
  Icon,
  CardMedia
} from '@mui/material'
import { FavoriteBorder, ArrowBackIos, Favorite, IosShare, SaveAlt } from '@mui/icons-material'
import VisionService from "../../services/VisionService"
import { visionInfo, changeRemixStatus, visionData } from '../../redux/visionSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import RemixIcon from '../../assets/images/remix.svg'
import DefaultAvatarIcon from '../../assets/images/default-avatar.svg'

const Detail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [visionDataInfo, setVisionDataInfo] = useState(null);
  const { id } = useParams()
  const savedVisionInfo = useSelector(visionInfo)

  const getVisionDataInfo = () => {
    VisionService.get(id)
      .then(res => {
        setVisionDataInfo({
          ...res.data[0],
          cnt: res.cnt
        })
      })
  }
  useEffect(() => {
    getVisionDataInfo()
  }, [])

  const handleLike = () => {
    const isInclude = visionDataInfo.like.includes(userInfo.email)
    if (isInclude) {
      VisionService.update(visionDataInfo._id, {
        id: visionDataInfo._id,
        visualization: {
          like: visionDataInfo.like.filter(each => {
            return each !== userInfo.email
          })
        }
      })
        .then(res => {
          getVisionDataInfo()
        })
    } else {
      VisionService.update(visionDataInfo._id, {
        id: visionDataInfo._id,
        visualization: {
          like: [...(visionDataInfo.like || []), userInfo.email]
        }
      })
        .then(res => {
          console.log(res)
          getVisionDataInfo()
        })
    }
  }

  const handleShare = () => {
    VisionService.update(visionDataInfo._id, {
      id: visionDataInfo._id,
      visualization: {
        shared: !visionDataInfo.shared
      }
    })
      .then(res => {
        console.log(res)
        getVisionDataInfo()
      })
  }

  const handleRemix = () => {
    dispatch(visionData({
      visionData: {}
    }))
    dispatch(changeRemixStatus({
      isRemix: true
    }))
    navigate('/vision/list')
  }

  return (
    <>
      {visionDataInfo && <Box component="div" className="main-style" sx={{ pt: 4, px: 2, mx: -2, backgroundColor: '#000' }}>
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <HeaderBar handleStartRemix={() => { }} initItemSelected={() => { }} />}
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <Box component="div" sx={{ pt: 8 }}></Box>}
        <Box component="div" sx={{ mx: '0', position: 'relative' }}>
          <h1 className="pageTitle">&nbsp;</h1>
          <IconButton onClick={() => navigate(-1)} className="top-left-button" color="primary" aria-label="upload picture" component="label">
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box component="div" sx={{ mx: -2 }}>
          <CardMedia
            component="video"
            autoPlay
            muted
            loop
            playsinline='true'
            src={(visionDataInfo.link && visionDataInfo.link.slice(0, 4) === 'http') ? visionDataInfo.link : process.env.REACT_APP_API_URL + visionDataInfo.link.slice(1)}
          />
        </Box>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Box component="div" sx={{ display: 'flex' }}>
            <Box sx={{ borderRadius: '50%', padding: '6px', display: 'flex', backgroundColor: '#BBC9DB' }}><img src={DefaultAvatarIcon} width="20" /></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <span>{visionDataInfo.userId._id}</span>
            </Box>
          </Box>
          <Box component="div" sx={{ display: 'flex' }}>
            <Icon sx={{ ml: 1, display: 'flex' }} onClick={handleLike}>{visionDataInfo.like.includes(userInfo.email) ? <Favorite /> : <FavoriteBorder />}</Icon>
            {/* <Icon sx={{ ml: 1, display: 'flex' }} onClick={handleShare}>{visionDataInfo.shared ? <SaveAlt /> : <IosShare />}</Icon> */}
          </Box>
        </Box>
        <Box component="div" sx={{ display: 'flex', mt: 1 }}>
          <Box className="tag-style">{visionDataInfo.cnt}</Box>
          <Box className="tag-style">{visionDataInfo.userId.race}</Box>
          <Box className="tag-style">{visionDataInfo.userId.gender}</Box>
        </Box>
        <Box component="div" sx={{ my: 1 }}>
          <Box component="p" className="detail-title" sx={{ mb: 0 }}>
            {(visionDataInfo.description[0] || '').split(',')[0].split('.')[0]}
          </Box>
          <Box component="p" className="detail-content" sx={{ mt: 1 }}>
            "{visionDataInfo.description[0]}"
          </Box>
        </Box>
        <Box component="div" className="fillAvailable">
          <Button variant="contained" disabled={savedVisionInfo.processing === 'working' ? true : false} className="button" onClick={() => handleRemix()} sx={{ textTransform: 'none', ml: '0 !important' }}>Remix<Icon sx={{ ml: 1, display: 'flex' }}><img src={RemixIcon} width="21" /></Icon></Button>
        </Box>
      </Box>}
    </>
  )
}
export default Detail