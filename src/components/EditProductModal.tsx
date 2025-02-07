import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/slices/productListSlice';
import { RootState } from '../store/store';
import { Product } from '../types/types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleSaveProduct = () => {
    if (updatedProduct.name && updatedProduct.quantity && updatedProduct.unit && updatedProduct.categoryId) {
      dispatch(updateProduct(updatedProduct));
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ padding: '0px', backgroundColor: 'white', margin: 'auto', marginTop: '-10%', width: '400px', borderRadius: '8px' }}>
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
        <TextField
          label="URL изображения"
          value={updatedProduct.imageUrl}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            value={updatedProduct.categoryId || ''}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, categoryId: e.target.value as number })}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSaveProduct} sx={{ marginTop: '20px' }}>
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;