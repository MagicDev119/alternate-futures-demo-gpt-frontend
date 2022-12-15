import { useEffect, useState } from 'react'
import {
  Box,
  AppBar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  LinearProgress
} from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux';
import { visionInfo, isRemix, changeRemixStatus, visionData, progressTimer } from '../redux/visionSlice';
import { useNavigate } from "react-router-dom"
import Close from '@mui/icons-material/Close';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 6,
  borderRadius: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#C2F947',
  },
}));

export default function HeaderBar({ handleStartRemix, initItemSelected }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const savedVisionInfo = useSelector(visionInfo);
  const savedIsRemix = useSelector(isRemix);
  const [progress, setProgress] = useState(1)
  const curProgress = useSelector(progressTimer)
  const [visioningFinished, setVisionFinished] = useState(false)
  const timeLimit = 60 * 10
  const curUrl = window.location.href.split('/')

  const getProgressTime = () => {
    const curTime = timeLimit - progress
    const min = (curTime - curTime % 60) / 60
    const sec = curTime % 60
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
  }

  useEffect(() => {
    if (savedVisionInfo.processing === 'generated') {
      setProgress(timeLimit)
      setVisionFinished(true)
    }
  }, [savedVisionInfo.processing])

  useEffect(() => {
    setProgress(curProgress >= timeLimit ? timeLimit : curProgress)
  }, [curProgress])

  const handleViewNewVision = () => {
    const visionId = savedVisionInfo.id
    dispatch(visionData({
      visionData: {}
    }))
    navigate('/vision/detail/' + visionId)
  }

  const handleCancelRemix = () => {
    dispatch(changeRemixStatus({
      isRemix: false
    }))
    initItemSelected()
  }
  return (
    <AppBar sx={{ background: '#2F2F2F' }}>
      <Toolbar sx={{ flexDirection: "column" }}>
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') &&
          <>
            {!visioningFinished && <Box component="div" sx={{ width: '100%', pt: 3 }}>
              <BorderLinearProgress variant="determinate" value={progress * 100 / timeLimit} />
            </Box>}
            <Box component="div" sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                {!visioningFinished && <Typography variant="body2" className="description" color="#BFBFC3">Visualizing...</Typography>}
                {visioningFinished && <Typography variant="body2" className="description" color="#BFBFC3">Done</Typography>}
              </Box>
              <Box component="div">
                {!visioningFinished && <Typography variant="body2" color="#FFF" fontWeight="bold">{getProgressTime()}</Typography>}
                {visioningFinished && <Button variant="contained" className="header-button" onClick={handleViewNewVision}>View</Button>}
              </Box>
            </Box>
          </>
        }
        {savedIsRemix &&
          <>
            <Box component="div" sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box component="div" sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                <Typography variant="body2" className="description" color="#BFBFC3">Choose up to two other visions to remix. </Typography>
              </Box>
              <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" className="header-button" onClick={handleStartRemix}>Done</Button>
                <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleCancelRemix}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </>
        }
      </Toolbar>
    </AppBar>

  )
}
