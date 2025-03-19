import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductDetailsPage from './pages/ProductDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';

// Главный функциональный компонент приложения
function App() {
  return (
    <Router>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<h1>404: Страница не найдена</h1>} />
                </Routes>
              </Box>
    </Router>
  );
}

export default App;
