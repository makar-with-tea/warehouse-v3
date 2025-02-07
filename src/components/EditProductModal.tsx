import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {updateProduct} from '../store/slices/productListSlice';
import { Product } from '../types/types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleSaveProduct = () => {
    if (updatedProduct.name && updatedProduct.description && updatedProduct.category && updatedProduct.quantity && updatedProduct.unit) {
      dispatch(updateProduct(updatedProduct));
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '400px', borderRadius: '8px' }}>
        <Typography variant="h6">Редактировать товар</Typography>
        <TextField
          label="Название товара"
          value={updatedProduct.name}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Описание"
          value={updatedProduct.description}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Категория"
          value={updatedProduct.category}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Количество на складе"
          type="number"
          value={updatedProduct.quantity}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Единица измерения"
          value={updatedProduct.unit}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, unit: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSaveProduct} sx={{ marginTop: '20px' }}>
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;