import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, Modal, TextField, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { addCategory, updateCategory, removeCategory } from '../store/slices/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';

interface Category {
  id: number;
  name: string;
}

const StyledH1 = styled('h1')`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  padding: 1rem;
  margin-top: 60px;
  border-radius: 8px;
`;

const CategoriesPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const products = useSelector((state: RootState) => state.productList);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    const categoryInUse = products.some((product) => product.categoryId === id);
    if (categoryInUse) {
      setSnackbarMessage('Невозможно удалить категорию, так как она используется в товарах.');
      setSnackbarOpen(true);
    } else {
      dispatch(removeCategory(id));
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewCategoryName('');
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCategory(null);
    setNewCategoryName('');
  };

  const saveNewCategory = () => {
    if (newCategoryName) {
      dispatch(addCategory({ id: categories.length + 1, name: newCategoryName }));
      closeAddModal();
    }
  };

  const saveEditedCategory = () => {
    if (currentCategory && newCategoryName) {
      dispatch(updateCategory({ ...currentCategory, name: newCategoryName }));
      closeEditModal();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Navbar toggleSidebar={() => {}} isSidebarOpen={false} />
      <StyledH1>Управление категориями товаров</StyledH1>
      <Button
        variant="contained"
        onClick={handleAddCategory}
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#995cb5',
          },
        }}
      >
        Добавить категорию
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
            <IconButton onClick={() => handleEditCategory(category)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteCategory(category.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Modal open={isAddModalOpen} onClose={closeAddModal}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '400px', borderRadius: '8px' }}>
          <Typography variant="h6">Добавить новую категорию</Typography>
          <TextField
            label="Название категории"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={saveNewCategory} sx={{ marginTop: '20px' }}>
            Сохранить
          </Button>
        </Box>
      </Modal>
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '400px', borderRadius: '8px' }}>
          <Typography variant="h6">Редактировать категорию</Typography>
          <TextField
            label="Название категории"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={saveEditedCategory} sx={{ marginTop: '20px' }}>
            Сохранить
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CategoriesPage;