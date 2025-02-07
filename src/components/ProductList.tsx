import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Product } from '../types/types';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import {StyledBox, StyledPagination} from '../styles/styledComponents';

// Интерфейс пропсов для ProductList
interface ProductListProps {
  products: Product[];
}


// Функциональный компонент ProductList
const ProductList: React.FC<ProductListProps> = ({products}) => {
  const navigate = useNavigate(); // Получение функции navigate из хука useNavigate
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Функция-обработчик клика по карточке продукта
  const handleCardClick = (product: Product) => {
    navigate(`/products/${product.id}`); // Переход на страницу выбранного продукта
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
    </Box>
  );
};

export default ProductList;