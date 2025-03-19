import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Box, List, ListItem, ListItemText, DialogContent, CircularProgress, Typography } from '@mui/material';
import { addCategory, updateCategory, removeCategory, fetchCategories } from '../store/slices/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import { StyledIconButton, StyledH1, StyledButton, StyledDialog, StyledDialogTitle, StyledTextField, StyledSnackbar } from '../styles/styledComponents';
import { Category } from '../types/types';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);
    const products = useSelector((state: RootState) => state.productList.products);
    const user = useSelector((state: RootState) => state.user);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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
            dispatch(addCategory({ id: categories.length + 1, name: newCategoryName, allowedGroups: [] }));
            closeAddModal();
        }
    };

    const saveEditedCategory = () => {
        if (currentCategory && newCategoryName) {
            dispatch(updateCategory({ id: currentCategory.id, name: newCategoryName, allowedGroups: currentCategory.allowedGroups }));
            closeEditModal();
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const isCategoryAccessible = (category: Category) => {
        return user.group === 'admin' || category.allowedGroups.includes(user.group);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '0px' }}>
            <Navbar toggleSidebar={() => {}} isSidebarOpen={false} />
            <StyledH1>Управление категориями товаров</StyledH1>
            <StyledButton onClick={handleAddCategory}>
                Добавить категорию
            </StyledButton>
            {categoriesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : categoriesError ? (
                <Typography variant="h6" color="error">
                    {categoriesError}
                </Typography>
            ) : (
                <List>
                    {Array.isArray(categories) && categories.map((category) => (
                        <ListItem key={category.id}>
                            <ListItemText primary={category.name} />
                            {isCategoryAccessible(category) && (
                                <>
                                    <StyledIconButton onClick={() => handleEditCategory(category)}>
                                        <EditIcon />
                                    </StyledIconButton>
                                    <StyledIconButton onClick={() => handleDeleteCategory(category.id)}>
                                        <DeleteIcon />
                                    </StyledIconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}

            <StyledDialog open={isAddModalOpen} onClose={closeAddModal} maxWidth="md" fullWidth>
                <StyledDialogTitle>
                    Добавить категорию
                </StyledDialogTitle>
                <DialogContent dividers>
                    <StyledTextField
                        label="Название категории"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <StyledButton variant="contained" onClick={saveNewCategory} sx={{ marginTop: '20px' }}>
                            Сохранить
                        </StyledButton>
                    </Box>
                </DialogContent>
            </StyledDialog>

            <StyledDialog open={isEditModalOpen} onClose={closeEditModal} maxWidth="md" fullWidth>
                <StyledDialogTitle>
                    Редактировать категорию
                </StyledDialogTitle>
                <DialogContent dividers>
                    <StyledTextField
                        label="Название категории"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <StyledButton variant="contained" onClick={saveEditedCategory} sx={{ marginTop: '20px' }}>
                            Сохранить
                        </StyledButton>
                    </Box>
                </DialogContent>
            </StyledDialog>

            <StyledSnackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default CategoriesPage;