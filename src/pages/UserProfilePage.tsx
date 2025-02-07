import React from 'react';
import { Box, Avatar, Stack, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { StyledH1 } from '../styles/styledComponents';

const UserProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

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
    </Box>
  );
};

export default UserProfilePage;