import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Sidebar from './components/Sidebar';
import products from './data/exampleProducts.json';
import styled from 'styled-components';

const categories: string[] = Array.from(new Set(products.map(product => product.category).filter((category): category is string => Boolean(category))));

// Внезапный другой подход к стилизации, самое время
const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  padding: 1rem;
  margin-top: 60px;
  border-radius: 8px;`
;

// Главный функциональный компонент приложения
function App() {
  // Состояние для бокового меню
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Функция для переключения состояния бокового меню
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Функция для применения фильтров
  const handleFilter = (filters: { search: string; inStock: boolean; category: string }) => {
    const regex = new RegExp(filters.search, 'i'); // Регулярное выражение для поиска по названию товара

    const filtered = products.filter((product) => {
      const matchesSearch = regex.test(product.name);
      const matchesStock = !filters.inStock || product.quantity > 0;
      const matchesCategory = !filters.category || product.category === filters.category;

      return matchesSearch && matchesStock && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <header>
        {/* Передача функции и состояния бокового меню в компонент Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </header>
        {/* Передача состояния и функции закрытия в компонент Sidebar */}
        <Sidebar categories={categories} isOpen={isSidebarOpen} onClose={toggleSidebar} onFilter={handleFilter} />
      <StyledH1>Склад "Лаванда"</StyledH1>
      {/* Передача отфильтрованных продуктов в компонент списка */}
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
