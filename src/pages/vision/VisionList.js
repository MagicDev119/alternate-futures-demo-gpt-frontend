import { useState, useEffect } from 'react'
import {
  Box,
  CssBaseline,
  Select,
  Input,
  MenuItem,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Container
} from '@mui/material'
import Close from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { visionData, changeRemixStatus, visionInfo, isRemix } from '../../redux/visionSlice'
import VisionService from "../../services/VisionService"
import constants from '../../libs/constants'

import BottomNavbar from '../../components/BottomNavbar'
import HeaderBar from '../../components/HeaderBar'
import CustomSelect from '../../components/CustomSelect'

import defaultThumbnail from '../../assets/images/default-thumbnail.png'
import UncheckIcon from '../../assets/images/uncheck.svg'
import CheckedIcon from '../../assets/images/checked.svg'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const races = constants.races
const genders = constants.genders

export default function VisionList(props) {

  const curUrl = window.location.href.split('/')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const savedVisionInfo = useSelector(visionInfo)
  const savedIsRemix = useSelector(isRemix)
  const [filterGender, setFilterGender] = useState([])
  const [filterRace, setFilterRace] = useState([])
  const [filterAge, setFilterAge] = useState([])
  const [itemData, setItemData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRemixItems, setSelectedRemixItems] = useState(0)

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
  useEffect(() => {
    getVisionData({})
  }, [savedVisionInfo.processing])

  const handleFilter = (value, action) => {
    switch (action) {
      case 'Age':
        setFilterAge(value)
        getVisionData({
          age: value,
          gender: filterGender,
          race: filterRace,
          q: searchQuery
        })
        break
      case 'Gender':
        setFilterGender(value)
        getVisionData({
          age: filterAge,
          gender: value,
          race: filterRace,
          q: searchQuery
        })
        break
      case 'Race':
        setFilterRace(value)
        getVisionData({
          age: filterAge,
          gender: filterGender,
          race: value,
          q: searchQuery
        })
        break
      default:
        break
    }
  }

  const handleStartRemix = () => {
    dispatch(changeRemixStatus({
      isRemix: false
    }))
    initItemSelected()

    let mixedDescription = []
    itemData.map(eachItem => {
      if (eachItem.selected) {
        mixedDescription[mixedDescription.length] = eachItem.description
      }
    })
    dispatch(visionData({
      visionData: {
        description: mixedDescription.join(', '),
        processing: 'start',
        type: 'remix'
      }
    }))
    navigate('/vision/prepare')
  }

  const handleSelectItem = (index) => {
    if (savedIsRemix) {
      let tItemData = itemData
      tItemData[index].selected = !tItemData[index].selected
      setItemData([...tItemData])
    } else {
      navigate('/vision/detail/' + itemData[index].id)
    }
  }

  const handleSearchQuery = (value) => {
    setSearchQuery(value)
    getVisionData({
      age: filterAge,
      gender: filterGender,
      race: filterRace,
      q: value
    })
  }

  const handleKeyDown = (e) => {
  }

  const initState = (page) => {
    switch (page) {
      case 'list':
        setSearchQuery('')
        getVisionData({
          age: filterAge,
          gender: filterGender,
          race: filterRace
        })
        break
      case 'search':
        setFilterGender('')
        setFilterRace('')
        setFilterAge('')
        getVisionData({
          q: searchQuery
        })
        break
      default:
        setFilterGender('')
        setFilterRace('')
        setFilterAge('')
        setSearchQuery('')
        break
    }
  }

  const initItemSelected = () => {
    let tItemData = itemData.map(each => {
      return {
        ...each,
        selected: false
      }
    })
    setItemData([...tItemData])
  }

  const handleCancelFilter = () => {
    setFilterGender([])
    setFilterRace([])
    setFilterAge([])
    getVisionData({})
  }

  return (
    <Box sx={{ pb: 12, px: 2, mx: -2, backgroundColor: '#000' }}>
      <CssBaseline />
      {(curUrl[curUrl.length - 1] === 'search') &&
        <Box component="div" sx={{ position: 'fixed', zIndex: 1001, width: '100%', left: 0, top: (savedVisionInfo.processing === 'working' || savedIsRemix) ? '70px' : (savedVisionInfo.processing === 'generated') ? '55px' : 0 }}>
          <Box component="div" sx={{ width: '90%', maxWidth: "500px", margin: 'auto' }} >
            <Input disableUnderline={true} className="search input-text fillAvailable" placeholder="Search" value={searchQuery} onChange={(e) => handleSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
          </Box>
        </Box>}
      {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated' || savedIsRemix) && <HeaderBar handleStartRemix={handleStartRemix} initItemSelected={initItemSelected} />}
      {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated' || savedIsRemix || (curUrl[curUrl.length - 1] === 'search')) && <Box component="div" sx={{ pt: 10 }}></Box>}
      <Container sx={{ px: 0 }}>
        {(curUrl[curUrl.length - 1] !== 'search' && !savedIsRemix) && <>
          <Box component="div" sx={{ pt: 4, pb: 2, px: 5, textAlign: 'center' }}>
            Check out what others have envisioned in this future world...
          </Box>
          <Box component="div" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {/* <CustomSelect min={1} max={100} changeValue={(value) => handleFilter(value, 'Age')} category="Age" inputClass="list-select-box" setAll={true} /> */}
            <Select
              displayEmpty
              value={filterAge}
              onChange={(event) => handleFilter(event.target.value, 'Age')}
              input={<Input disableUnderline={true} className="list-select-box" />}
              renderValue={(selected) => {
                if (selected && selected.length === 0) {
                  return <Box component="span" sx={{ color: '#0C0507' }}>Age</Box>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label', 'className': 'text-black padding-right-15' }}
            >
              <MenuItem disabled value="">
                Age
              </MenuItem>
              {Array.from({ length: 100 }, (v, k) => k + 1).map((each) => (
                <MenuItem
                  key={each}
                  value={each}
                >
                  {each}
                </MenuItem>
              ))}
            </Select>
            <Select
              displayEmpty
              value={filterGender}
              onChange={(event) => handleFilter(event.target.value, 'Gender')}
              input={<Input disableUnderline={true} className="list-select-box" />}
              renderValue={(selected) => {
                if (selected && selected.length === 0) {
                  return <Box component="span" sx={{ color: '#0C0507' }}>Gender</Box>
                }

                return selected
              }}
              MenuProps={MenuProps}
              sx={{ flex: '1 0', width: '-webkit-fill-available' }}
              inputProps={{ 'aria-label': 'Without label', 'className': 'text-black padding-right-15' }}
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
            <Select
              displayEmpty
              value={filterRace}
              onChange={(event) => handleFilter(event.target.value, 'Race')}
              sx={{ flex: '1 0', width: '-webkit-fill-available' }}
              input={<Input disableUnderline={true} className="list-select-box" />}
              renderValue={(selected) => {
                if (selected && selected.length === 0) {
                  return <Box component="span" sx={{ color: '#0C0507' }}>Race</Box>
                }

                return selected
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label', 'className': 'text-black padding-right-15' }}
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
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleCancelFilter}>
              <Close />
            </IconButton>
          </Box>
        </>}
        <ImageList sx={{ width: '100%', height: 'auto', gap: '10px !important' }} cols={2}>
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={!item.img ? defaultThumbnail : (item.img && item.img.slice(0, 4) === 'http') ? item.img : process.env.REACT_APP_API_URL + item.img.slice(1)}
                alt={item.title}
                loading="lazy"
                className='img-list'
                onClick={() => handleSelectItem(index)}
              />
              <ImageListItemBar
                subtitle={<span className="infoText" style={{ whiteSpace: 'break-spaces' }}>{item.description}</span>}
                position="below"
              />
              {savedIsRemix &&
                <ImageListItemBar
                  sx={{
                    background: 'none',
                    p: item.selected ? 1 : '16px'
                  }}
                  title={item.title}
                  position="top"
                  onClick={() => handleSelectItem(index)}
                  actionIcon={
                    item.selected ? <Icon sx={{ fontSize: '44px', display: 'flex' }}><img src={CheckedIcon} width="58" /></Icon> : <Icon sx={{ fontSize: '28px', display: 'flex' }}><img src={UncheckIcon} width="28" /></Icon>
                  }
                  actionPosition="right"
                />
              }
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <BottomNavbar initState={initState} />
    </Box >
  )
}
