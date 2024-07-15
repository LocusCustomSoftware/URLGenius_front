import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api'; // Importa a instância do axios
import { Container, Box, Typography, TextField, Button, Alert} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const PasswordReset = () => {
    const { uid, token } = useParams(); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }
        try {
            const response = await api.post(`/api/reset-password/${uid}/${token}/`, {
                new_password1: password,
                new_password2: confirmPassword,
            });
            setSuccess('Senha redefinida com sucesso.');
            setError('');
        } catch (error) {
            setError('Erro ao redefinir a senha. Por favor, tente novamente.');
            console.error('There was an error!', error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography component="h1" variant="h5">
                    Redefinir de Senha
                </Typography>
                <Typography variant="body1" mt={2}>
                    Bem vindo, você fez o primeiro login na sua conta URL Genius.
                </Typography>
                <Alert severity="info" sx={{ mt: 3 }}>
                    Por questões de segurança, é preciso fazer a alteração da sua senha. Esta é uma etapa padrão e obrigatória.
                </Alert>
                <Alert severity="warning" sx={{ mt: 2 }}>
                    A nova senha não pode ser igual a senha atual.
                </Alert>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="userId"
                        label="ID do Usuário"
                        name="userId"
                        value="iddousuario@empresa.com.br"
                        disabled
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Nova Senha"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirme a Nova Senha"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' } }}
                    >
                        ALTERAR SENHA
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PasswordReset;
