import React, { useState } from "react"
import { Box, Button, Input, Checkbox, FormControlLabel, Typography, Link } from '@mui/material'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUpButton = () => {
    UserService.signup({
      email,
      password
    }).then(res => {
      if (res.code === 200) {
        dispatch(handleLogin({ ...res.user.userInfo, token: res.token, _id: res.user._id, cnt: res.user.cnt }))
        setTimeout(() => {
          navigate('/user/userinfo')
        }, 100)
      }
    })
  }
  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 4 }}>
        <Box component="div">
          <h1 className="pageTitle">Let's get started</h1>
        </Box>
        <Box component="div">
          <Box component="p" className="description" sx={{ m: '5vw' }}>
            Create a username and password. We can create an alphanumeric code if you’d like to have an anonymous username.
          </Box>
        </Box>
        <Box component="div">
          <Box component="div">
            <Input disableUnderline={true} className="input-text fillAvailable" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box component="div">
            <Input disableUnderline={true} type="password" className="input-text fillAvailable" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Box component="div" className="termsPolicyText" sx={{ mb: 2 }}>
            <FormControlLabel className="termsPolicyText" control={<Checkbox defaultChecked color="third" />} label={<Typography className="termsPolicyText">I acknowledge that I have read, understood, and agree to <Link className="third">Terms and Privacy</Link></Typography>} />
          </Box>
          <Button variant="contained" className="fillAvailable button" disabled={!email} onClick={() => handleSignUpButton()}>Next</Button>
        </Box>
      </Box>
    </>
  )
}
export default SignUp