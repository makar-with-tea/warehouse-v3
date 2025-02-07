import React from 'react';
import {Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {StyledAppBar, NavbarItem, StyledLink} from '../styles/styledComponents';

interface NavbarProps {
  toggleSidebar: () => void; // Добавляем пропс для функции
  isSidebarOpen: boolean; // Добавляем пропс для состояния бокового меню
}

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
        <StyledLink to="/">
          <NavbarItem variant="h6">Товары</NavbarItem>
        </StyledLink>
        <NavbarItem variant="h6">Склады</NavbarItem>
        <NavbarItem variant="h6">О системе</NavbarItem>
        <StyledLink to="/categories">
          <NavbarItem variant="h6">Категории</NavbarItem>
        </StyledLink>
        <StyledLink to="/profile">
          <NavbarItem variant="h6">Личная страница пользователя</NavbarItem>
        </StyledLink>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;