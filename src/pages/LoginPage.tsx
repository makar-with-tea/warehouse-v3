import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { login } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { StyledTextField, StyledButton } from '../styles/styledComponents';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      console.log('Login successful');
      navigate('/profile');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <StyledTextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Введите email"
        label="Email"
        fullWidth
        margin="normal"
      />
      <StyledTextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
        label="Пароль"
        fullWidth
        margin="normal"
      />
      <StyledButton onClick={handleLogin}>
        Войти
      </StyledButton>
    </div>
  );
};

export default LoginPage;