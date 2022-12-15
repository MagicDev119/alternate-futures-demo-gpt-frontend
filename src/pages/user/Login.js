import React, { useState } from "react"
import { Box, Button, Input, Icon } from '@mui/material'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import GoogleLogin from 'react-google-login';
import constants from '../../libs/constants'
// import GoogleIcon from '../../assets/images/google.svg'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLoginButton = () => {
    UserService.login({
      email,
      password
    }).then(res => {
      if (res.code === 200) {

        dispatch(handleLogin({ ...res.user.user, token: res.token, _id: res.user._id, cnt: res.user.cnt }))
        navigate('/vision/meditation')
      }
    })
  }

  const responseGoogle = async (authResult) => {
    console.log(authResult)
    // try {
    //   if (authResult['code']) {
    //     const result = await UserService.loginWithGoogle(authResult['code']);
    //     console.log(result);
    //     // dispatch(handleLogin({ ...res.user.user, token: res.token, _id: res.user._id, cnt: res.user.cnt }))
    //     // navigate('/vision/meditation')
    //   } else {
    //     throw new Error(authResult);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 7 }}>
        <Box component="div">
          <Box component="div">
            <Input disableUnderline={true} className="input-text fillAvailable" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box component="div">
            <Input disableUnderline={true} type="password" className="input-text fillAvailable" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Box>
          {/* <Box component="div" sx={{ pt: 6, px: 2 }}>
            <GoogleLogin
              clientId={constants.GOOGLE_CLIENT_ID}
              buttonText="Login with google"
              responseType="code"
              redirectUri="postmessage"
              render={(renderProps) => (
                <button type="button" className="google-button">
                  <div className="google-icon-body">
                    <Icon className="google-icon"><img src={GoogleIcon} width="64%" /></Icon>
                  </div>
                  <span className="google-button-text">Sign in with Google</span>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />


          </Box> */}
        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" disabled={!email} onClick={() => handleLoginButton()}>Login</Button>
        </Box>
      </Box>
    </>
  )
}
export default Login