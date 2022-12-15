import React, { useState } from "react"
import {
  Box,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { visionData } from '../../redux/visionSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import BottomNavbar from '../../components/BottomNavbar'
import TextAnimation from '../../components/TextAnimation'

const Exercise = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visionDescription, setVisionDescription] = useState('');
  const textObject = {
    title: ["What do you believe to be true in a world where the climate crisis is over?"],
    textLabel: ["FUTURE VISION"],
    tipTitle: ["TIPS"],
    tip: [
      ["Set aside doubts of how it might happen or obstacles that might get in the way."],
      ["Think of a specific scene. Where you living, eating, socializing, working?"],
      ["This will show up in our public gallery."]
    ]
  }
  const handleStartVisionButton = () => {
    if (visionDescription && visionDescription !== '') {
      dispatch(visionData({
        visionData: {
          description: visionDescription,
          processing: 'start'
        }
      }))
      navigate('/vision/prepare')
    }
  }

  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 4, pb: 12 }}>
        <Box component="div" sx={{ mx: 1 }}>
          <h1 className="pageTitle">
            <TextAnimation textData={textObject.title} />
          </h1>
        </Box>
        <Box component="div" sx={{ mx: 1, my: 1 }}>
          <Box component="p" className="description" sx={{ mb: 0, mx: 3 }}>
            <TextAnimation textData={textObject.textLabel} />
          </Box>
          <Box component="div">
            <TextareaAutosize
              maxRows={9}
              minRows={9}
              aria-label="maximum height"
              placeholder="Describe what you envision."
              className="input-text fillAvailable"
              value={visionDescription}
              onChange={e => setVisionDescription(e.target.value)}
            />
          </Box>
        </Box>
        <Box component="div" className="description" sx={{ mx: 4 }}>
          <Box component="p" sx={{ mb: 0 }}>
            <TextAnimation textData={textObject.tipTitle} />
          </Box>
          <Box component="ol" className="description tip-style" sx={{ mt: 0 }}>
            <li><span><TextAnimation textData={textObject.tip[0]} /></span></li>
            <li><TextAnimation textData={textObject.tip[1]} /></li>
            <li><TextAnimation textData={textObject.tip[2]} /></li>
          </Box>
        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={() => handleStartVisionButton()}>Start Visioning</Button>
        </Box>
        <BottomNavbar initState={() => { }} />
      </Box>
    </>
  )
}
export default Exercise