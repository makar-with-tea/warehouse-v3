import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, CardHeader, Typography, Tooltip, styled } from '@mui/material';
import { Product } from '../types/types';
import placeholderImage from '../assets/placeholderImage.jpg';

// Стили для карточки с фиксированным размером и эффектом увеличения при наведении
const StyledCard = styled(Card)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '8px',
  width: '240px',
  height: '350px',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: 'rgba(245, 245, 245, 0)',
  color: '#fff',
});

// Стили для контейнера изображения товара
const StyledCardMedia = styled(CardMedia)({
  width: '200px',
  height: '200px',
  overflow: 'hidden',
  margin: '0 auto',
  position: 'relative',
  borderRadius: '8px',
});

// Стили для изображения товара
const StyledImg = styled('img')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%)',
});

// Стили для категории и количества товара
const StyledTypography = styled(Typography)({
  fontSize: '0.8em',
  color: '#909090',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '1',
  LineClamp: '1',
  margin: '4px 0',
});

// Стили для описания товара
const StyledDescriptionTypography = styled(Typography)({
  fontSize: '0.8em',
  color: '#fff',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '1',
  LineClamp: '1',
  margin: '4px 0',
});

// Функциональный компонент ProductCard
const ProductCard: React.FC<Product> = ({ name, description, category, quantity, unit, imageUrl }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || placeholderImage);

  useEffect(() => {
    setImgSrc(imageUrl || placeholderImage);
  }, [imageUrl]);

  const handleError = () => {
    setImgSrc(placeholderImage);
  };

  return (
    <Tooltip title={description ? description : '-'} arrow
      PopperProps={{ sx: 
        { '.MuiTooltip-tooltip': 
          { bgcolor: 'rgba(33, 19, 38, 0.8)', 
          color: '#fff', 
          fontSize: '0.8em', 
          borderRadius: '8px',
          overflow: 'hidden',
          lineClamp: 3,
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box'
        } } }}
    >
      <StyledCard>
        <CardHeader
          title={name}
          titleTypographyProps={{
            sx: {
              display: '-webkit-box',
              fontWeight: 'bold',
              fontSize: '1.2em',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 1,
              lineClamp: 1,
              color: '#fff',
              textAlign: 'center',
            },
          }}
        />
        <StyledCardMedia>
          <StyledImg
            src={imgSrc}
            alt={name}
            onError={handleError}
          />
        </StyledCardMedia>
        <CardContent>
          <StyledTypography>
            {quantity} {unit}
          </StyledTypography>
          <StyledTypography>
            {category ? category : '-'}
          </StyledTypography>
          <StyledDescriptionTypography>
            {description ? description : '-'}
          </StyledDescriptionTypography>
        </CardContent>
      </StyledCard>
    </Tooltip>
  );
};

export default ProductCard;