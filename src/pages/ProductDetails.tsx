import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import EditProductModal from '../components/EditProductModal';
import { Product } from '../types/types';
import { removeProduct } from '../store/slices/productListSlice';
import placeholderImage from '../assets/placeholderImage.jpg';

const StyledCardMedia = styled('div')({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
  borderRadius: '8px',
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '300px',
  objectFit: 'contain',
  borderRadius: '8px',
});

const StyledBox = styled(Box)({
  padding: '20px',
  backgroundColor: '#bba5cf',
  color: '#2e2a31',
  borderRadius: '8px',
  width: '60%',
  maxHeight: '80%',
  overflowY: 'auto',
  textAlign: 'left',
  margin: 'auto',
  marginTop: '10%',
});

const StyledButton = styled(Button)({
  marginRight: '10px',
});


const ProductDetails: React.FC = () => {
  const { id } = useParams<Record<string, string>>();
  const product = useSelector((state: RootState) => state.productList.find((p: Product) => p.id === parseInt(id!)));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) => state.categories);

  if (!product) {
    return <Typography>Товар не найден</Typography>;
  }

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = () => {
    dispatch(removeProduct(product.id));
    navigate('/');
  };

  const [imgSrc, setImgSrc] = useState(product.imageUrl || placeholderImage);

  const handleError = () => {
    setImgSrc(placeholderImage);
  };

  return (
    <StyledBox>
      <Typography variant="h4">{product.name}</Typography>
      <StyledCardMedia>
        <StyledImg src={imgSrc} alt={product.name} onError={handleError} />
      </StyledCardMedia>
      <Typography variant="body1" gutterBottom>
        <strong>Описание:</strong> {product.description}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        <strong>Категория:</strong> {categories.find((c) => c.id === product.categoryId)?.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Количество:</strong> {product.quantity} {product.unit}
      </Typography>
      <StyledButton variant="contained" onClick={handleEditProduct}>
        Редактировать товар
      </StyledButton>
      <StyledButton variant="contained" onClick={handleDeleteProduct}>
        Удалить товар
      </StyledButton>
      <EditProductModal isOpen={isEditModalOpen} onClose={closeEditModal} product={product} />
    </StyledBox>
  );
};

export default ProductDetails;