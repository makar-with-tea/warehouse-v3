import React, { useState } from 'react';
import { FormControl, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/slices/productListSlice';
import { Product } from '../types/types';
import { RootState } from '../store/store';
import { StyledTextField, StyledButton, StyledSelect, StyledInputLabel,
    StyledDialog, StyledDialogTitle, StyledMenuItem } from '../styles/styledComponents';


interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    quantity: 0,
    unit: '',
    imageUrl: ''
  });

  const handleSaveProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.unit) {
      dispatch(addProduct({ ...newProduct, id: Date.now() }));
      onClose();
      setNewProduct({ id: 0, name: '', description: '', categoryId: 0, quantity: 0, unit: '', imageUrl: '' });
    }
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        Добавить новый товар
        </StyledDialogTitle>
        <DialogContent dividers>
        <StyledTextField
          label="Название товара"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Количество на складе"
          type="number"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Единица измерения"
          value={newProduct.unit}
          onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Описание"
          value={newProduct.description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <StyledInputLabel id="category-label">Категория</StyledInputLabel>
          <StyledSelect
            labelId="category-label"
            value={newProduct.categoryId || ''}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value as number })}
            required
          >
            <StyledMenuItem value=""></StyledMenuItem>
            {categories.map((category) => (
              <StyledMenuItem key={category.id} value={category.id}>
                {category.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledTextField
          label="URL изображения"
          value={newProduct.imageUrl || ''}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          fullWidth
          margin="normal"
        />
        <StyledButton variant="contained" color="primary" onClick={handleSaveProduct} sx={{ marginTop: '20px' }}>
          Сохранить
        </StyledButton>
        </DialogContent>
    </StyledDialog>
  );
};

export default AddProductModal;