import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box } from '@mui/material';
import ProductList from '../components/ProductList';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddProductModal from '../components/AddProductModal';
import { StyledButton } from '../styles/styledComponents';

const ProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.productList);
  const categories = useSelector((state: RootState) => state.categories);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilter = (filters: { search: string; inStock: boolean; categoryId: number | ''}) => {
    const regex = new RegExp(filters.search, 'i');
    const filtered = products.filter((product) => {
      const matchesSearch = regex.test(product.name);
      const matchesStock = !filters.inStock || product.quantity > 0;
      const matchesCategory = filters.categoryId == '' || product.categoryId === filters.categoryId;
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '0px' }}>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar categories={categories} isOpen={isSidebarOpen} onClose={toggleSidebar} onFilter={handleFilter} />
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
      <Box sx={{ flexGrow: 1, p: 3, mt: 2, width: '100%' }}>
        <StyledButton
          variant="contained"
          onClick={handleAddProduct}
        >
          Добавить товар
        </StyledButton>
        <ProductList products={filteredProducts} />
      </Box>
    </Box>
  );
};

export default ProductsPage;