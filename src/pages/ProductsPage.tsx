import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Button } from '@mui/material';
import ProductList from '../components/ProductList';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddProductModal from '../components/AddProductModal';
import styled from 'styled-components';

// Внезапный другой подход к стилизации, самое время
const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  padding: 1rem;
  margin-top: 60px;
  border-radius: 8px;`
;

const ProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.productList);
  const categories: string[] = Array.from(new Set(products.map(product => product.category).filter((category): category is string => Boolean(category))));
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilter = (filters: { search: string; inStock: boolean; category: string }) => {
    const regex = new RegExp(filters.search, 'i');
    const filtered = products.filter((product) => {
      const matchesSearch = regex.test(product.name);
      const matchesStock = !filters.inStock || product.quantity > 0;
      const matchesCategory = !filters.category || product.category === filters.category;
      return matchesSearch && matchesStock && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar categories={categories} isOpen={isSidebarOpen} onClose={toggleSidebar} onFilter={handleFilter} />
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <StyledH1>Склад "Лаванда"</StyledH1>
      <Button
          variant="contained"
          onClick={handleAddProduct}
          sx={{
            backgroundColor: '#c88eff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#995cb5',
            },
          }}
        >
          Добавить товар
        </Button>
        <ProductList products={filteredProducts} />
      </Box>
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default ProductsPage;