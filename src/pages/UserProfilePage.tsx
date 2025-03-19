import React from 'react';
import { Box, Avatar, Stack, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { StyledH1, StyledButton } from '../styles/styledComponents';
import { logout } from '../store/slices/userSlice';
import { useNavigate } from 'react-router';

const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => {
    console.log(state.user);
    return state.user
});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!user.token) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '0px' }}>
      <StyledH1 gutterBottom>
        Пользователь не авторизован
      </StyledH1>
      <StyledButton onClick={() => navigate('/login')}>
        Войти
      </StyledButton>
    </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '0px' }}>
      <Navbar toggleSidebar={() => {}} isSidebarOpen={false} />
      <StyledH1 gutterBottom>
        Профиль пользователя
      </StyledH1>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body2">{user.group}</Typography>
        </Box>
      </Stack>
      <StyledButton onClick={handleLogout} sx={{ marginTop: '20px' }}>
        Выйти
      </StyledButton>
    </Box>
  );
};

export default UserProfilePage;