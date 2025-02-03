import React, { useState } from 'react';
import { Pagination, Box } from '@mui/material';
import { Product } from '../types/types';
import styled from '@emotion/styled';
import ProductCard from './ProductCard';
import ModalWindow from './ModalWindow';

// Интерфейс пропсов для ProductList
interface ProductListProps {
  products: Product[];
}

const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  rowGap: '30px',
  justifyContent: 'flex-start',
  overflow: 'visible',
});

const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  '& .MuiPaginationItem-root': {
    color: '#ffffff',
    '&.Mui-selected': {
      backgroundColor: '#58218b',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#dd93ff',
      },
    },
    '&:hover': {
      backgroundColor: '#dd93ff',
    },
  },
});

// Функциональный компонент ProductList
const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Функция-обработчик клика по карточке продукта
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product); // Установка выбранного продукта в состояние
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setSelectedProduct(null); // Сброс выбранного продукта
  };

  // Функция для обработки изменения страницы
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Вычисление продуктов для текущей страницы
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ margin: '20px' }}>
      <StyledBox>
        {/* Отображение списка продуктов с помощью map */}
        {paginatedProducts.map((product, index) => (
          <Box
            key={index}
            onClick={() => handleCardClick(product)}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            {/* Передача продукта в компонент ProductCard */}
            <ProductCard {...product} />
          </Box>
        ))}
      </StyledBox>

      {/* Кастомизация пагинации */}
      <StyledPagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />

      {/* Отображение модального окна при выбранном продукте */}
      {selectedProduct && (
        <ModalWindow product={selectedProduct} onClose={closeModal} />
      )}
    </Box>
  );
};

export default ProductList;