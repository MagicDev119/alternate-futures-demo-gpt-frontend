import React, { useState } from "react"
import SelectDatepicker from '../../components/SelectDatePicker';
import HeaderBar from '../../components/HeaderBar'
import {
  Box,
  Button,
  Input,
  IconButton,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { visionInfo } from '../../redux/visionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import constants from '../../libs/constants'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const races = constants.races
const genders = constants.genders
const getDate = (date) => {
  if (!date) return ''
  let yourDate = new Date(date)
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
  return yourDate.toISOString().split('T')[0]
}
const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [userGender, setUserGender] = useState(userInfo.gender)
  const savedVisionInfo = useSelector(visionInfo)
  const [userRace, setUserRace] = useState(userInfo.race);
  const [userBirth, setUserBirth] = useState(getDate(userInfo.birthday));
  const handleSaveButton = () => {
    UserService.update({
      birthday: userBirth,
      gender: userGender,
      race: userRace,
      email: email,
      password: password
    }).then(res => {
      if (res.code === 200) {
        const curUser = JSON.parse(localStorage.getItem('user'))
        dispatch(handleLogin({
          ...curUser,
          birthday: res.newUserData.newUserData.birthday,
          gender: res.newUserData.newUserData.gender,
          race: res.newUserData.newUserData.race,
          email: res.newUserData.newUserData.email,
          cnt: res.newUserData.cnt
        }))
        navigate('/user/profile')
      }
    })
  }

  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 4 }}>
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <HeaderBar handleStartRemix={() => { }} initItemSelected={() => { }} />}
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <Box component="div" sx={{ pt: 8 }}></Box>}
        <Box component="div" sx={{ mx: '0', position: 'relative' }}>
          <h1 className="pageTitle" style={{ margin: 0 }}>Settings </h1>
          <IconButton onClick={() => navigate(-1)} className="top-left-button" color="primary" aria-label="upload picture" component="label">
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box component="div" sx={{ mt: 6, flex: '1 0' }}>
          {/* {email} */}
          <Box component="div">
            <Input autoComplete='no' disableUnderline={true} className="input-text fillAvailable" value={email || ''} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box component="div">
            <Input autoComplete='no' disableUnderline={true} type="password" className="input-text fillAvailable" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Box>
        </Box>
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', flex: '16 0' }}>
          <Box component="div">
            <InputLabel>Date of Birth</InputLabel>
            <SelectDatepicker handleDate={setUserBirth} birthday={userBirth} />
          </Box>
          <Box component="div">
            <Select
              displayEmpty
              value={userGender}
              onChange={(event) => setUserGender(event.target.value)}
              input={<Input disableUnderline={true} className="input-text fillAvailable" />}
              renderValue={(selected) => {
                if (selected && selected.length === 0) {
                  return <Box component="span" sx={{ color: '#9e9e9e' }}>Gender</Box>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                Gender
              </MenuItem>
              {genders.map((gender) => (
                <MenuItem
                  key={gender}
                  value={gender}
                >
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box component="div">
            <Select
              displayEmpty
              value={userRace}
              onChange={(event) => setUserRace(event.target.value)}
              input={<Input disableUnderline={true} className="input-text fillAvailable" />}
              renderValue={(selected) => {
                if (selected && selected.length === 0) {
                  return <Box component="span" sx={{ color: '#9e9e9e' }}>Race</Box>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                Race
              </MenuItem>
              {races.map((race) => (
                <MenuItem
                  key={race}
                  value={race}
                >
                  {race}
                </MenuItem>
              ))}
            </Select>
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={() => handleSaveButton()}>Save</Button>
        </Box>
      </Box>
    </>
  )
}
export default Settings