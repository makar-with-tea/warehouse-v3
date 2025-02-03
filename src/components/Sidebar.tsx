import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Stack,
  FormControl
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';

// Интерфейс для пропсов Sidebar
interface SidebarProps {
  categories: string[]; // Массив категорий
  isOpen: boolean; // Состояние открыт/закрыт сайдбар
  onClose: () => void; // Функция закрытия сайдбара
  onFilter: (filters: { search: string; inStock: boolean; category: string }) => void; // Функция применения фильтров
}

// Стили для бокового меню
const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '300px',
    backgroundColor: '#492d63',
    color: 'white',
    marginTop: '50px',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    zIndex: 100, // Ниже, чем у панели навигации
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    '&.MuiDrawer-paperAnchorLeft': {
      transform: 'translateX(0)',
    },
  },
}));

// Стили для текстового поля
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: 'white', // Цвет вводимого текста
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)', // Цвет рамки по умолчанию
    },
    '&:hover fieldset': {
      borderColor: '#c88eff', // Цвет рамки при наведении
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c88eff', // Цвет рамки при фокусе
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)', // Цвет метки по умолчанию
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#c88eff', // Цвет метки при фокусе
  },
});

// Стили для чекбокса
const StyledCheckbox = styled(Checkbox)({
  color: 'rgba(255, 255, 255, 0.23)', // Цвет чекбокса
  '&.Mui-checked': {
    color: '#c88eff', // Цвет чекбокса при выборе
  },
});

// Стили для выбора категории
  const StyledSelect = styled(Select)({
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.23)', // Цвет рамки по умолчанию
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#c88eff', // Цвет рамки при наведении
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#c88eff', // Цвет рамки при фокусе
    },
    '& .MuiSelect-icon': {
      color: 'white', // Цвет стрелки
    },
  });
  
const StyledInputLabel = styled(InputLabel)({
  color: 'rgba(255, 255, 255, 0.7)', // Цвет метки по умолчанию
  '&.Mui-focused': {
    color: '#c88eff', // Цвет метки при фокусе
  },
});

// Стили для элемента категории
const StyledMenuItem = styled(MenuItem)({
  color: 'white', // Цвет текста
  backgroundColor: '#58218b', // Цвет фона
  '&:hover': {
    backgroundColor: '#995cb5', // Цвет фона при наведении
  },
  '&.Mui-selected': {
    backgroundColor: '#dd93ff', // Цвет фона для выбранного элемента
    '&:hover': {
      backgroundColor: '#995cb5', // Цвет фона при наведении
  },
}});

// Стили для кнопки
const StyledButton = styled(Button)({
  backgroundColor: '#c88eff', // Цвет фона
  color: 'white', // Цвет текста
  '&:hover': {
    backgroundColor: '#995cb5', // Цвет фона при наведении
  },
});

// Функциональный компонент Sidebar
const Sidebar: React.FC<SidebarProps> = ({ categories, isOpen, onClose, onFilter }) => {
  const [search, setSearch] = useState('');
  const [inStock, setInStock] = useState(false);
  const [category, setCategory] = useState('');

  const handleApplyFilters = () => {
    onFilter({ search, inStock, category });
    onClose(); // Закрыть сайдбар после применения фильтров
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
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
          >
            <StyledMenuItem value="">Все категории</StyledMenuItem>
            {categories.map((category, index) => (
              <StyledMenuItem key={index} value={category}>
                {category}
              </StyledMenuItem>
            ))}
          </StyledSelect>
          {/* Кнопка сброса */}
          {category && (
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              onClick={() => setCategory('')} // Сброс значения категории
            >
              <ClearIcon />
            </IconButton>
          )}
        </FormControl>
        {/* Кнопка применения фильтров */}
        <StyledButton onClick={handleApplyFilters}>
          Применить
        </StyledButton>
      </Stack>
    </StyledDrawer>
  );
};

export default Sidebar;