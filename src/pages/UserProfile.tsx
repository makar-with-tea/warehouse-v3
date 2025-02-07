import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import placeholderImage from '../assets/placeholderImage.jpg';

const UserProfile: React.FC = () => {
  const user = {
    name: 'Иван Иванов',
    email: 'ivan.ivanov@example.com',
    group: 'Студент',
    avatar: placeholderImage,
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Профиль пользователя
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body2">{user.group}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;