import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  Icon,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import defaultThumbnail from '../assets/images/default-thumbnail.png'
const ImageGallery = ({ itemData }) => {

  const navigate = useNavigate()
  const handleSelectItem = (index) => {
    navigate('/vision/detail/' + itemData[index].id)
  }

  return (
    <>
      <ImageList sx={{ width: '100%', height: 'auto', gap: '10px !important', mb: 0 }} cols={2}>
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
              subtitle={<span className="infoText" style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{item.description}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
export default ImageGallery;