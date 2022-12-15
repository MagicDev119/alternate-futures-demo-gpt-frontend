import React, { useState, useEffect } from "react"
import ImageGallery from '../../components/ImageGallery';
import HeaderBar from '../../components/HeaderBar'
import {
  Box,
  Tab,
  IconButton,
  AppBar,
  Button,
  Icon,
  Tabs
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../../redux/authSlice'
import { visionInfo } from '../../redux/visionSlice'

import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import SettingsIcon from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import VisionService from "../../services/VisionService"
import { useNavigate } from "react-router-dom"
import CoverImage from '../../assets/images/Cover.png'
import BottomNavbar from '../../components/BottomNavbar'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [itemData, setItemData] = useState([])
  const savedVisionInfo = useSelector(visionInfo)
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const filter = {}
    switch (newValue) {
      case 0:
        filter.filterType = 'single'
        break
      case 1:
        filter.filterType = 'remix'
        break
      case 2:
        filter.filterType = 'like'
        break
      default:
        break
    }
    getVisionData(filter)
  };

  const getVisionData = (filter) => {
    VisionService.getAll(filter)
      .then(res => {
        setItemData(res.data.map(each => {
          return {
            img: each.thumbnail_url,
            description: each.description.join(','),
            id: each._id
          }
        }))
      })
  }

  const handleLogoutClick = () => {
    dispatch(handleLogout())
    navigate('/')
  }
  useEffect(() => {
    getVisionData({
      filterType: 'single'
    })
  }, [])

  return (
    <>
      <Box component="div" sx={{ pt: 4, position: 'relative' }}>
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <HeaderBar handleStartRemix={() => { }} initItemSelected={() => { }} />}
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') && <Box component="div" sx={{ pt: 7 }}></Box>}
        <Box component="div" sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <img src={CoverImage} style={{ width: '-webkit-fill-available' }} />
        </Box>
        <Box component="div" sx={{ mx: 2, mt: '-3px', position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={() => navigate(-1)} color="primary" aria-label="upload picture" component="label">
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={() => navigate('/user/settings')} color="primary" aria-label="upload picture" component="label">
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box component="div" sx={{ mx: 2, mt: 1, position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="div" className="profile-avatar" />
          <Box component="p" className="description" sx={{ my: 2, color: '#C2F947' }}>
            {userInfo.email}
          </Box>
        </Box>
        <Box component="div" sx={{ mt: 3 }}>
          <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              className="tabs"
              aria-label="full width tabs example"
            >
              <Tab className="tab-select" label="Created" {...a11yProps(0)} />
              <Tab className="tab-select" label="Remixed" {...a11yProps(1)} />
              <Tab className="tab-select" label="Liked" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel component="div" className="tabpanel-body" value={value} index={0}>
            <ImageGallery itemData={itemData} />
          </TabPanel>
          <TabPanel className="tabpanel-body" value={value} index={1}>
            <ImageGallery itemData={itemData} />
          </TabPanel>
          <TabPanel className="tabpanel-body" value={value} index={2}>
            <ImageGallery itemData={itemData} />
          </TabPanel>
        </Box>
        <Box component="div" className="fillAvailable" sx={{ pb: 8, backgroundColor: '#000', pl: 3 }}>
          <Button variant="contained" className="button" onClick={() => handleLogoutClick()} sx={{ textTransform: 'none', ml: '0 !important' }}>Logout<Icon sx={{ ml: 1, display: 'flex' }}><Logout width="21" /></Icon></Button>
        </Box>
        <BottomNavbar initState={() => { }} />
      </Box>
    </>
  )
}
export default Profile