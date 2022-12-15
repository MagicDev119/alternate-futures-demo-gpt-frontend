import { Route, Routes, Navigate } from 'react-router'
import "./libs/axiosInit"
// import io from 'socket.io-client'
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material'

import './App.css'
import { useEffect, useMemo, useState } from 'react'
import Home from "./pages/Home"
import { useNavigate } from "react-router-dom"

// import { useSelector, useDispatch } from 'react-redux';
// import { changeStatus, changeProgress, visionInfo, visionData } from './redux/visionSlice';
// import { handleLogin } from './redux/authSlice'
import Vision from "./pages/Vision"

// const socket = io(process.env.REACT_APP_API_URL)
function App() {

  const navigate = useNavigate()
  const [isProfilePage, setIsProfilePage] = useState(false)
  // const dispatch = useDispatch()
  const createAppTheme = (options) => responsiveFontSizes(createTheme(options))
  const theme = createAppTheme({
    palette: {
      mode: 'dark',
      background: {
        default: "#000"
      },
      primary: {
        main: '#FFF',
      },
      secondary: {
        main: '#e65100',
      },
      third: {
        main: '#C2F947'
      },
      spacing: 8
    },
    overrides: {
      MuiFormControlLabel: {
        label: {
          fontSize: '0.875rem',
        }
      }
    }
  })

  // const savedVisionInfo = useSelector(visionInfo);

  // useEffect(() => {
  //   socket.on('generated', (data) => {
  //     console.log(data)
  //     dispatch(visionData({
  //       visionData: {
  //         description: data._doc.description,
  //         id: data._doc._id,
  //         processing: 'generated'
  //       }
  //     }))

  //     let curUser = JSON.parse(localStorage.getItem('user'))
  //     curUser.cnt = data.cnt
  //     dispatch(handleLogin({
  //       ...curUser
  //     }))
  //   })

  //   socket.on('changeTimer', (data) => {
  //     console.log(data)
  //     dispatch(changeProgress({
  //       progress: data
  //     }))
  //   })

  //   socket.on('setVisionData', (data) => {
  //     console.log(data)
  //     dispatch(visionData({
  //       visionData: data
  //     }))
  //   })

  //   socket.on('error', (err) => {
  //     console.log(err)
  //     dispatch(changeStatus({
  //       visionStatus: 'generated'
  //     }))
  //   })

  //   return () => {
  //     socket.off('generated')
  //     socket.off('changeTimer')
  //     socket.off('error')
  //     socket.off('setVisionData')
  //   }
  // }, [])

  // useEffect(() => {
  //   if (socket && savedVisionInfo.processing === 'start') {
  //     dispatch(changeStatus({
  //       visionStatus: 'working'
  //     }))

  //     socket.emit('message', {
  //       ...savedVisionInfo,
  //       token: localStorage.getItem("token")
  //     })
  //   }
  // }, [savedVisionInfo])

  // const isLoggedIn = () => {
  //   return localStorage.getItem("token") && localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== 'null'
  // }

  // useMemo(() => {
  //   isLoggedIn() && socket.emit('connected', { token: localStorage.getItem("token") })
  // }, [localStorage.getItem("token")])

  const AuthGate = ({ children }) => {
    return (
      <>
        {/* {isLoggedIn() ? children : <Navigate to="/" component={Home} />} */}
        {children}
      </>
    )
  }
  useEffect(() => {
    const curUrl = window.location.href.split('/')
    setIsProfilePage(curUrl[curUrl.length - 1] === 'profile')
  }, [navigate])
  //stable-diffusion
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Container className={isProfilePage ? 'profile-container' : ''}>
        <Routes>
          <Route path="/" element={<Home type="start" />} />
          <Route path="/play" element={<Home type="play" />} />
          <Route path="/inputaudio" element={<Home type="inputaudio" />} />
          <Route path="/inputtext" element={<Home type="inputtext" />} />
          <Route path="/step5" element={<Vision />} />

          {/* <Route path="/user/login" element={isLoggedIn() ? <Navigate to='/vision/meditation' /> : <Login />} /> */}
          {/* <Route path="/user/signup" element={isLoggedIn() ? <Navigate to='/user/userinfo' /> : <SignUp />} /> */}
          {/* <Route path="*" element={<AuthGate> */}
          {/* <Routes> */}
          {/* <Route path="/user/userinfo" element={<UserInfo />} /> */}
          {/* <Route path="/user/profile" element={<Profile />} /> */}
          {/* <Route path="/user/settings" element={<Settings />} /> */}
          {/* <Route path="/vision/meditation" element={<Meditation />} /> */}
          {/* <Route path="/vision/exercise" element={<Exercise />} /> */}
          {/* <Route path="/vision/visioning" element={<Visioning />} /> */}
          {/* <Route path="/vision/prepare" element={<Prepare />} /> */}
          {/* <Route path="/vision/detail/:id" element={<Detail />} /> */}
          {/* <Route path="/vision/list" element={<VisionList type="list" />} /> */}
          {/* <Route path="/vision/search" element={<VisionList type="search" />} /> */}
          {/* <Route path="/vision/remix" element={<VisionList type="remix" />} /> */}
          {/* <Route path="/test" element={<TextAnimation />} /> */}
          {/* </Routes> */}
          {/* </AuthGate>} /> */}
        </Routes >
      </Container>
    </ThemeProvider>
  )
}

export default App
