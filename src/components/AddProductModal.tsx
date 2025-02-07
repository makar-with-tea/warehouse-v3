import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/productListSlice';
import { Product } from '../types/types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    quantity: 0,
    unit: '',
  });

  const handleSaveProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.unit) {
      dispatch(addProduct({ ...newProduct, id: Date.now() }));
      onClose();
      setNewProduct({ id: 0, name: '', quantity: 0, unit: '' });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '400px', borderRadius: '8px' }}>
        <Typography variant="h6">Добавить новый товар</Typography>
        <TextField
          label="Название товара"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Количество на складе"
          type="number"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Единица измерения"
          value={newProduct.unit}
          onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Описание"
          value={newProduct.description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Категория"
          value={newProduct.category || ''}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL изображения"
          value={newProduct.imageUrl || ''}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSaveProduct} sx={{ marginTop: '20px' }}>
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;