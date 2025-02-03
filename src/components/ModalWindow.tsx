import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import placeholderImage from '../assets/placeholderImage.jpg';
import { Product } from '../types/types';

// Интерфейс пропсов для ModalWindow
interface ModalWindowProps {
  product: Product;
  onClose: () => void; // Функция закрытия модального окна
}

// Стили для изображения товара
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

// Стили для изображения
const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '300px',
  objectFit: 'contain', // Масштабирование изображения для сохранения пропорций
  borderRadius: '8px',
});

// Стили для модального окна
const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: '#bba5cf',
    color: '#2e2a31',
    borderRadius: '8px',
    width: '60%',
    maxHeight: '80%',
    overflowY: 'auto', // Вертикальная прокрутка
    textAlign: 'left',
  },
});

// Стили для заголовка модального окна
const StyledDialogTitle = styled(DialogTitle)({
  color: 'white',
  fontSize: '1.5em',
  marginBottom: '8px',
  textAlign: 'center',
});

// Стили для кнопки закрытия
const StyledButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  top: 8,
  color: 'white',
});

/*
Я использовала Dialog, а не Modal, потому что Dialog предоставляет встроенные функции для закрытия окна,
а также позволяет прокручивать содержимое, если оно не помещается на экране.
*/

// Функциональный компонент ModalWindow, принимающий свойства продукта и функцию закрытия
const ModalWindow: React.FC<ModalWindowProps> = ({ product, onClose }) => {
  // Хранение URL изображения с помощью состояния
  const [imgSrc, setImgSrc] = useState(product.imageUrl || placeholderImage);

  // Функция обработки ошибок загрузки изображения
  const handleError = () => {
    setImgSrc(placeholderImage); // Установить изображение-заглушку
  };

  return (
    <StyledDialog open onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        {product.name}
        <StyledButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </StyledButton>
      </StyledDialogTitle>
      <DialogContent dividers>
        <StyledCardMedia>
          <StyledImg
            src={imgSrc}
            alt={product.name}
            onError={handleError}
          />
        </StyledCardMedia>
        <Typography variant="body1" gutterBottom>
        <strong>Описание:</strong> {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Категория:</strong> {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <strong>Количество:</strong> {product.quantity} {product.unit}
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
};

export default ModalWindow;