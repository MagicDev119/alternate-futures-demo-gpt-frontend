import { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Icon
} from '@mui/material'
import ProfileIcon from '../assets/images/profile.svg'
import PlusIcon from '../assets/images/plus.svg'
import SearchIcon from '../assets/images/search.svg'
import HomeIcon from '../assets/images/home.svg'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { visionInfo, isRemix } from '../redux/visionSlice';

export default function LabelBottomNavigation({ handleNavbar, initState }) {

  const navigate = useNavigate()
  const curUrl = window.location.href.split('/')
  const [value, setValue] = useState(curUrl[curUrl.length - 1] || 'list')

  const savedVisionInfo = useSelector(visionInfo);
  const savedIsRemix = useSelector(isRemix);

  const handleChange = (event, newValue) => {
    setValue(newValue)
    switch (newValue) {
      case 'list':
        initState('list')
        navigate('/vision/list')
        break
      case 'profile':
        initState('profile')
        navigate('/user/profile')
        break
      case 'plus':
        initState('plus')
        navigate('/vision/exercise')
        break
      case 'search':
        initState('search')
        navigate('/vision/search')
        break
    }
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(207, 219, 213, 0.15)' }} elevation={4}>
      <BottomNavigation
        showLabels={false}
        value={value}
        onChange={(event, newValue) => {
          handleChange(event, newValue)
        }}
        sx={{
          height: '80px',
          backgroundColor: '#000',
          ".Mui-selected > span.material-icons": {
            background: 'rgba(235, 240, 240, 0.1)',
            padding: '10px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          ".Mui-disabled": {
            background: '#1a1a1a'
          },
          ".Mui-disabled img": {
            opacity: 0.2
          }
        }}
      >
        <BottomNavigationAction classes={{
          selected: {
            color: 'red'
          }
        }} value="list" icon={<Icon><img src={HomeIcon} /></Icon>} />
        <BottomNavigationAction value="search" icon={<Icon><img src={SearchIcon} /></Icon>} />
        <BottomNavigationAction disabled={savedVisionInfo.processing == 'working' || savedIsRemix} value="plus" icon={<Icon><img src={PlusIcon} /></Icon>} />
        <BottomNavigationAction value="profile" icon={<Icon><img src={ProfileIcon} /></Icon>} />
      </BottomNavigation>
    </Paper>
  )
}