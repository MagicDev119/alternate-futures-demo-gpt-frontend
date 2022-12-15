import React, { useState } from "react"
import SelectDatepicker from '../../components/SelectDatePicker';
import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
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

const UserInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userGender, setUserGender] = useState([])
  const [userRace, setUserRace] = useState([]);
  const [userBirth, setUserBirth] = useState(null);
  const handleStartVisionButton = () => {
    UserService.update({
      birthday: userBirth,
      gender: userGender,
      race: userRace
    }).then(res => {
      if (res.code === 200) {
        const curUser = JSON.parse(localStorage.getItem('user'))
        dispatch(handleLogin({
          ...curUser,
          birthday: res.newUserData.newUserData.birthday,
          gender: res.newUserData.newUserData.gender,
          race: res.newUserData.newUserData.race,
          cnt: res.newUserData.cnt
        }))
        navigate('/vision/meditation')
      }
    })
  }

  return (
    <>
      <Box component="div" className="main-style" sx={{ pt: 4 }}>
        <Box component="div" sx={{ mx: '56px' }}>
          <h1 className="pageTitle">Before we get started, a bit about you </h1>
        </Box>
        <Box component="div">
          <Box component="p" className="description" sx={{ m: '28px 27px 0 27px' }}>
            We collect this info to better understand how your future visions may be informed by your background and contexts. Sharing this information is optional.
          </Box>
        </Box>
        <Box component="div" sx={{ mt: 4 }}>
          <Box component="div">
            <InputLabel>Date of Birth</InputLabel>
            <SelectDatepicker handleDate={setUserBirth} />
          </Box>
          <Box component="div">
            <Select
              displayEmpty
              value={userGender}
              onChange={(event) => setUserGender(event.target.value)}
              input={<Input disableUnderline={true} className="input-text fillAvailable" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
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
                if (selected.length === 0) {
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
          <Button variant="contained" className="fillAvailable button" onClick={() => handleStartVisionButton()}>Start Visioning</Button>
        </Box>
      </Box>
    </>
  )
}
export default UserInfo