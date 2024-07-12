import React, { useState } from 'react';
import api from '../utils/api';
import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Alert, Grid, Link, InputAdornment,IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../css/Login.css';
import { grey } from '@mui/material/colors';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/token/', {
                username,
                password,
            });
            // Salva os tokens no localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log('Login successful');
            // Redirecionar ou fazer alguma ação após login bem-sucedido
        } catch (error) {
            setError('Nome de usuário ou senha incorretos');
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center', fontSize: '3rem' }}>
                    Bem Vindo      
                </Typography>
                <p>Você está no URL Genius.</p>
            </div>
            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <Typography component="h1" variant="h5" sx={{ textAlign: 'center', fontSize: '3rem' }}>
                        Login URL Genius
                    </Typography>
                    <Typography component="p" variant="body1" mt={1} sx={{ textAlign: 'center', fontSize: '0.9rem', color: '#828181' }}>
                        Por favor, insira suas credenciais.
                    </Typography>
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuário"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Lembrar de mim"
                                />
                            </Grid>
                            <Grid item>
                                <Link href="/forgot-password" variant="body2">
                                    Esqueceu sua senha?
                                </Link>
                            </Grid>
                        </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' } }}
                        
                    >
                        Entrar
                    </Button>
                    <p className="contact">Não tem uma conta? <a href="/contact">Entre em contato.</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
