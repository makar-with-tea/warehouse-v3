import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

interface NavbarProps {
  toggleSidebar: () => void; // Добавляем пропс для функции
  isSidebarOpen: boolean; // Добавляем пропс для состояния бокового меню
}

// Стили для навигационной панели
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#58218b', // Фон панели навигации
  color: 'white', // Цвет текста
  position: 'fixed', // Зафиксированное положение сверху
  top: 0,
  width: '100%', // Ширина на 100% от ширины окна просмотра
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Тень под панелью
  zIndex: 2000, // Расположение поверх других элементов
});

// Стили для элементов панели навигации
const NavbarItem = styled(Typography)({
  marginRight: '20px', // Отступы между элементами
  transition: 'color 0.3s', // Плавный переход цвета
  '&:hover': {
    color: '#dd93ff', // Смена цвета текста при наведении
    cursor: 'pointer', // Смена курсора на указатель
  },
  fontSize: '1em', // Размер шрифта
});

// Функциональный компонент Navbar
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Обработчик клика для кнопки открытия боковой панели */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        {/* Остальные пункты меню */}
        <NavbarItem variant="h6">Товары</NavbarItem>
        <NavbarItem variant="h6">Склады</NavbarItem>
        <NavbarItem variant="h6">О системе</NavbarItem>
        <NavbarItem variant="h6">Личная страница пользователя</NavbarItem>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;