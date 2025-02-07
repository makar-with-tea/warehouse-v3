import React, { useState, useEffect } from 'react';
import { CardContent, CardHeader, Tooltip, IconButton } from '@mui/material';
import { Product } from '../types/types';
import placeholderImage from '../assets/placeholderImage.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../store/slices/productListSlice';
import { RootState } from '../store/store';
import { StyledCard, StyledCardMedia, StyledDescriptionTypography, StyledImg, StyledTypography } from '../styles/styledComponents';

// Функциональный компонент ProductCard
const ProductCard: React.FC<Product> = ({ name, description, categoryId, quantity, unit, imageUrl, id }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || placeholderImage);

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const handleDelete = () => {
    dispatch(removeProduct(id));
  };

  useEffect(() => {
    setImgSrc(imageUrl || placeholderImage);
  }, [imageUrl]);

  const handleError = () => {
    setImgSrc(placeholderImage);
  };

  const category = categories.find((category) => category.id === categoryId)?.name;

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
          action={
            <Tooltip title="Удалить товар">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
        }
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
            {categoryId ? category : '-'}
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