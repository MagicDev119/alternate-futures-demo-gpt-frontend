import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, CardMedia, TextareaAutosize, Input } from '@mui/material'
import TextAnimation from '../components/TextAnimation'
import Sound from 'react-sound';
import logo from '../assets/images/logo.svg'
import audioUrl from '../assets/audio/start.m4a'
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder"
import useSpeechToText from 'react-hook-speech-to-text';
import recordingIcon from '../assets/images/recording.svg'
import pauseRecordingIcon from '../assets/images/pauseRecording.svg'

const Home = ({ type }) => {
  const navigate = useNavigate()
  const [userPassionate, setUserPassionate] = useState('');
  const [userHobbies, setUserHobbies] = useState('');
  const [userProfession, setUserProfession] = useState('');
  const [userName, setUserName] = useState('')
  const [inputAudioText, setInputAudioText] = useState('')

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const handleSongPlaying = (data) => {
    if (data.position > 30 * 1000) {
      navigate('/inputtext')
    }
  }

  const handleStartVisionButton = () => {
    window.localStorage.setItem('inputtext', userProfession + ',' + userHobbies + ',' + userPassionate);
    window.localStorage.setItem('user_profession', userProfession);
    window.localStorage.setItem('user_hobbies', userHobbies);
    window.localStorage.setItem('user_passionate', userPassionate);
    window.localStorage.setItem('username', userName);
    navigate('/inputaudio')
  }

  const handleInputAudio = () => {
    window.localStorage.setItem('inputaudio', inputAudioText);
    navigate('/step5')
  }

  useMemo(() => {
    const inputArray = []
    results.map((result) => {
      inputArray.push(result.transcript)
    })
    setInputAudioText(inputArray.join(', '))
  }, [results])

  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: '21vh' }}>
        <Box component="div" sx={{ position: 'relative' }}>
          <CardMedia
            className="home-logo"
            component="img"
            image={logo}
            alt="Visual"
          />
        </Box>
        <Box component="div" sx={{ fontSize: '1rem', textAlign: 'center', px: 3 }}>
          <h1>
            ALTERNATE FUTURES
          </h1>
        </Box>
        <Box component="div" sx={{ textAlign: 'center' }}>
          <Box component="div" className="description" sx={{ m: ((type == 'inputtext' || type == 'inputaudio') ? '1rem 2rem 2rem 2rem' : '1rem 2rem 5rem 2rem'), textAlign: 'center' }}>
            {(type == 'start') && <TextAnimation textData={["How do you envision a future in which we are to succeed in overcoming the climate crisis?"]} />}
            {(type == 'play') && <TextAnimation textData={["Listen to the following audio narrative and envision the future"]} />}
            {(type == 'inputtext') && <TextAnimation textData={["Tell us about yourself - profession, hobbies, skills, etc."]} />}
            {(type == 'inputaudio') && <TextAnimation textData={["Please speak your vision of the future"]} />}
          </Box>
          {(type == 'play') && <>
            <Sound
              url={audioUrl}
              playStatus={Sound.status.PLAYING}
              playFromPosition={300}
              onPlaying={handleSongPlaying}
            />
          </>}
          {(type == 'inputtext') && <Box component="div">
            <Input disableUnderline={true} className="input-text fillAvailable" value={userName} placeholder="Tell us your name" onChange={(e) => setUserName(e.target.value)} />
            <Input disableUnderline={true} className="input-text fillAvailable" value={userProfession} placeholder="Tell us your profession" onChange={(e) => setUserProfession(e.target.value)} />
            <Input disableUnderline={true} className="input-text fillAvailable" value={userHobbies} placeholder="What are your hobbies?" onChange={(e) => setUserHobbies(e.target.value)} />
            <TextareaAutosize
              maxRows={9}
              minRows={9}
              aria-label="maximum height"
              placeholder="What are you passionate about"
              className="input-text fillAvailable"
              value={userPassionate}
              onChange={e => setUserPassionate(e.target.value)}
            />
          </Box>}
          {(type == 'inputaudio') && <>
            {/* <h1>Recording: {isRecording.toString()}</h1>
            <Button className="button-styled" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button> */}
            <Button className="button-styled" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
              <img src={isRecording ? pauseRecordingIcon : recordingIcon} />
            </Button>
            {error && <p>Web Speech API is not available in this browser. Input about your future!</p>}
            <TextareaAutosize
              maxRows={9}
              minRows={9}
              aria-label="maximum height"
              placeholder="Speak about your future."
              className="input-text fillAvailable"
              value={inputAudioText}
              onChange={e => setInputAudioText(e.target.value)}
            />
          </>}
        </Box>
        <Box component="div" className="fillAvailable footer">
          <Box component="div">
            {(type == 'start') && <Button onClick={() => navigate('/play')} variant="contained" className="fillAvailable button">Start</Button>}
            {(type == 'play') && <Button onClick={() => navigate('/inputtext')} variant="contained" className="fillAvailable button">Next</Button>}
            {(type == 'inputtext') && <Button variant="contained" className="fillAvailable button" onClick={() => handleStartVisionButton()}>Next</Button>}
            {(type == 'inputaudio') && <Button onClick={() => handleInputAudio()} variant="contained" className="fillAvailable button">Next</Button>}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Home