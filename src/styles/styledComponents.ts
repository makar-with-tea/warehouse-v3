import { AppBar, Typography, Card, CardMedia, Button, Box, Pagination,
  Drawer, TextField, Checkbox, Select, InputLabel, MenuItem,
  Dialog, DialogTitle, IconButton, Snackbar} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Стили для навигационной панели
export const StyledAppBar = styled(AppBar)({
    backgroundColor: '#58218b', // Фон панели навигации
    color: 'white', // Цвет текста
    position: 'fixed', // Зафиксированное положение сверху
    top: 0,
    width: '100%', // Ширина на 100% от ширины окна просмотра
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Тень под панелью
    zIndex: 2000, // Расположение поверх других элементов
  });
  
  // Стили для элементов панели навигации
  export const NavbarItem = styled(Typography)({
    marginRight: '20px', // Отступы между элементами
    transition: 'color 0.3s', // Плавный переход цвета
    '&:hover': {
      color: '#dd93ff', // Смена цвета текста при наведении
      cursor: 'pointer', // Смена курсора на указатель
    },
    fontSize: '1em', // Размер шрифта
  });
  
  export const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: '#dd93ff',
    },
  });


  // Стили для карточки с фиксированным размером и эффектом увеличения при наведении
export const StyledCard = styled(Card)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '8px',
  width: '250px',
  height: '380px',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: 'rgba(245, 245, 245, 0)',
  color: '#fff',
});

// Стили для контейнера изображения товара
export const StyledCardMedia = styled(CardMedia)({
  width: '200px',
  height: '200px',
  overflow: 'hidden',
  margin: '0 auto',
  position: 'relative',
  borderRadius: '8px',
});

// Стили для изображения товара
export const StyledImg = styled('img')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%)',
});

// Стили для категории и количества товара
export const StyledTypography = styled(Typography)({
  fontSize: '0.8em',
  color: '#909090',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '1',
  LineClamp: '1',
  margin: '4px 0',
});

// Стили для описания товара
export const StyledDescriptionTypography = styled(Typography)({
  fontSize: '0.8em',
  color: '#fff',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '1',
  LineClamp: '1',
  margin: '4px 0',
});

// Стили для бокового меню
export const StyledDrawer = styled(Drawer)(() => ({
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
export const StyledTextField = styled(TextField)({
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
export const StyledCheckbox = styled(Checkbox)({
  color: 'rgba(255, 255, 255, 0.23)', // Цвет чекбокса
  '&.Mui-checked': {
    color: '#c88eff', // Цвет чекбокса при выборе
  },
});

// Стили для выбора категории
export const StyledSelect = styled(Select)({
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
  
  export const StyledInputLabel = styled(InputLabel)({
  color: 'rgba(255, 255, 255, 0.7)', // Цвет метки по умолчанию
  '&.Mui-focused': {
    color: '#c88eff', // Цвет метки при фокусе
  },
});

// Стили для элемента категории
export const StyledMenuItem = styled(MenuItem)({
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
export const StyledButton = styled(Button)({
  backgroundColor: '#c88eff', // Цвет фона
  color: 'white', // Цвет текста
  '&:hover': {
    backgroundColor: '#995cb5', // Цвет фона при наведении
  },
});

export const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  rowGap: '30px',
  justifyContent: 'flex-start',
  overflow: 'visible',
});

export const StyledPagination = styled(Pagination)({
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

// Стили для модального окна
export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: '#492d63',
    color: '#2e2a31',
    borderRadius: '8px',
    width: '60%',
    maxHeight: '80%',
    overflowY: 'auto', // Вертикальная прокрутка
    textAlign: 'left',
  },
});

// Стили для заголовка модального окна
export const StyledDialogTitle = styled(DialogTitle)({
  color: 'white',
  fontSize: '1.5em',
  marginBottom: '8px',
  textAlign: 'center',
});

// Стили для кнопки закрытия
export const StyledIconButton = styled(IconButton)({
  color: 'white',
  '&:hover': {
    color: '#dd93ff',
  },
});

export const StyledBigImg = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
  borderRadius: '8px',
  marginBottom: '16px',
  objectFit: 'contain',
});

export const StyledH1 = styled(Typography)({
  color: 'white',
  fontSize: '2.5em',
  fontWeight: 700,
  padding: '1rem',
  margin: '0px',
  textAlign: 'center',
  borderRadius: '8px',
});

export const StyledSnackbar = styled(Snackbar)({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#58218b',
    color: 'white',
    borderRadius: '8px',
    '& .MuiSnackbarContent-action': {
      marginRight: '0',
    },
  },
});