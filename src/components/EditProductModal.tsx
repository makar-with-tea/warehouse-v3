import React, { useState } from 'react';
import { FormControl, DialogContent, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/slices/productListSlice';
import { Product } from '../types/types';
import { RootState } from '../store/store';
import { StyledTextField, StyledButton, StyledSelect, StyledInputLabel, StyledDialog, StyledDialogTitle, StyledMenuItem } from '../styles/styledComponents';

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
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        Редактировать товар
      </StyledDialogTitle>
      <DialogContent dividers>
        <StyledTextField
          label="Название товара"
          value={updatedProduct.name}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Количество на складе"
          type="number"
          value={updatedProduct.quantity}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Единица измерения"
          value={updatedProduct.unit}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, unit: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <StyledTextField
          label="Описание"
          value={updatedProduct.description || ''}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <StyledInputLabel id="category-label">Категория</StyledInputLabel>
          <StyledSelect
            labelId="category-label"
            value={updatedProduct.categoryId || ''}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, categoryId: e.target.value as number })}
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
          value={updatedProduct.imageUrl || ''}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <StyledButton variant="contained" color="primary" onClick={handleSaveProduct} sx={{ marginTop: '20px' }}>
          Сохранить
        </StyledButton>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default EditProductModal;