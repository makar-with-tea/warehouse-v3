import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  IconButton,
  Stack,
  FormControl
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Category } from '../types/types';
import {StyledDrawer, StyledTextField, StyledCheckbox, StyledInputLabel, StyledSelect, StyledMenuItem, StyledButton} from '../styles/styledComponents';

// Интерфейс для пропсов Sidebar
interface SidebarProps {
  categories: Category[]; // Массив категорий
  isOpen: boolean; // Состояние открыт/закрыт сайдбар
  onClose: () => void; // Функция закрытия сайдбара
  onFilter: (filters: { search: string; inStock: boolean; categoryId: number | '' }) => void; // Функция применения фильтров
}

// Функциональный компонент Sidebar
const Sidebar: React.FC<SidebarProps> = ({ categories, isOpen, onClose, onFilter }) => {
  const [search, setSearch] = useState('');
  const [inStock, setInStock] = useState(false);
  const [categoryId, setCategoryId] = useState<number | ''>('');

  const handleApplyFilters = () => {
    onFilter({ search, inStock, categoryId });
    onClose(); // Закрыть сайдбар после применения фильтров
  };

  const handleReset = () => {
    setSearch('');
    setInStock(false);
    setCategoryId(0);
    onFilter({ search: '', inStock: false, categoryId: 0});
  };

  return (
    <StyledDrawer
      anchor="left" // Положение сайдбара (слева)
      open={isOpen} // Состояние сайдбара (открыт/закрыт)
      onClose={onClose} // Закрытие сайдбара
    >
      {/* Заголовок */}
      <Typography variant="h6" marginBottom={2}>Фильтры</Typography>
      <Stack spacing={2}>
        {/* Поиск */}
        <Box sx={{ position: 'relative' }}>
          <StyledTextField
            fullWidth
            label="Поиск"
            variant="outlined"
            placeholder="Введите текст..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <IconButton
              size="small"
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => setSearch('')}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>
        <FormControlLabel
          control={<StyledCheckbox checked={inStock} onChange={(e) => setInStock(e.target.checked)} />}
          label="Есть на складе"
        />
        {/* Селект для выбора категории */}
        <FormControl fullWidth margin="normal" sx={{ position: 'relative' }}>
          <StyledInputLabel id="category-label">Выбрать категорию</StyledInputLabel>
          <StyledSelect
            labelId="category-label"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value as number)}
          >
            <StyledMenuItem value="">Все категории</StyledMenuItem>
            {Array.isArray(categories) && categories.map((category) => (
              <StyledMenuItem key={category.id} value={category.id}>
                {category.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
          {/* Кнопка сброса */}
          {categoryId && (
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              onClick={() => setCategoryId('')} // Сброс значения категории
            >
              <ClearIcon />
            </IconButton>
          )}
        </FormControl>
        {/* Кнопка применения фильтров */}
        <StyledButton onClick={handleApplyFilters}>
          Применить
        </StyledButton>
        {/* Кнопка сброса */}
        <StyledButton onClick={handleReset}>
          Сбросить фильтры
        </StyledButton>
      </Stack>
    </StyledDrawer>
  );
};

export default Sidebar;