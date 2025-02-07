import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Typography } from '@mui/material';
import { removeProduct } from '../store/slices/productListSlice';
import EditProductModal from '../components/EditProductModal';
import Navbar from '../components/Navbar';
import placeholderImage from '../assets/placeholderImage.jpg';
import { StyledBigImg, StyledIconButton } from '../styles/styledComponents';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.productList.find((p) => p.id === Number(id)));
  const categories = useSelector((state: RootState) => state.categories);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.imageUrl || placeholderImage);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = () => {
    if (product) {
      dispatch(removeProduct(product.id));
      navigate('/');
    }
  };

  const handleError = () => {
    setImgSrc(placeholderImage);
  };

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '0px' }}>
      <Navbar toggleSidebar={() => {}} isSidebarOpen={false} />
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Box>
            <StyledIconButton onClick={handleEditProduct}>
              <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={handleDeleteProduct}>
              <DeleteIcon />
            </StyledIconButton>
          </Box>
        <StyledBigImg src={imgSrc} alt={product.name} onError={handleError} />
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1">
            {product.description || '-'}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Категория
          </Typography>
          <Typography variant="body1">
            {categories.find((c) => c.id === product.categoryId)?.name || '-'}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Количество
          </Typography>
          <Typography variant="body1">
            {product.quantity} {product.unit}
          </Typography>
        </Box>
        <EditProductModal isOpen={isEditModalOpen} onClose={closeEditModal} product={product} />
    </Box>
  );
};

export default ProductDetailsPage;