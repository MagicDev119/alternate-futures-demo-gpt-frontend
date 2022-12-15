import { Box, Button, Input } from '@mui/material'
import { useNavigate } from "react-router-dom"
import TextAnimation from '../../components/TextAnimation'

const Meditation = () => {
  const navigate = useNavigate()
  const handleNextMeditation = () => {
    navigate('/vision/exercise')
  }

  const text = [
    "Close your eyes for a moment and imagine a world in which we've massively succeeded at addressing the climate crisis.",
    'A world in which all of human ingenuity, creativity, passion, and love, was focused on regenerating our shared home.'
  ]
  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 6 }}>
        <Box component="div">
          <Box component="div">
            <Box component="div" className="descriptionLg" sx={{ m: '3vw' }}>
              <TextAnimation textData={[text[0]]} />
            </Box>
          </Box>
          <Box component="div" sx={{ mt: 5 }}>
            <Box component="div" className="descriptionLg" sx={{ m: '3vw' }}>
              <TextAnimation textData={[text[1]]} />
            </Box>
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={handleNextMeditation}>Next</Button>
        </Box>
      </Box>
    </>
  )
}
export default Meditation