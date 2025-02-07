import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import ProductsPage from './pages/ProductsPage';

// Главный функциональный компонент приложения
function App() {
  return (
    <Router>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/categories" element={<h1>Категории</h1>} />
                  <Route path="*" element={<h1>404: Страница не найдена</h1>} />
                </Routes>
              </Box>
    </Router>
  );
}

export default App;
