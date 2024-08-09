import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const userEmail = 'usuario@example.com'; // Substitua com o email do usuário dinamicamente

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Verificar se as senhas correspondem
        if (formData.newPassword !== formData.confirmPassword) {
            setError('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Simular a lógica de redefinição de senha (pode ser substituído com uma chamada a API real)
        // Aqui, estamos apenas exibindo uma mensagem de sucesso após 1 segundo
        setTimeout(() => {
            setSuccessMessage('Senha redefinida com sucesso!');
            setFormData({
                newPassword: '',
                confirmPassword: '',
            });
            setError('');
        }, 1000);
    };

    const handleBack = () => {
        // Implemente a lógica para voltar, se necessário
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="left" gutterBottom>
                    Redefinir Senha
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="body1" align="left" color="textSecondary" gutterBottom>
                    ID do usuário
                </Typography>
                <Typography variant="body1" align="left" gutterBottom>
                    {userEmail}
                </Typography>                
                <TextField
                    fullWidth
                    margin="normal"
                    id="newPassword"
                    name="newPassword"
                    label="Nova Senha"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar Nova Senha"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                        {error}
                    </Typography>
                )}
                {successMessage && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1, mb: 1 }}>
                        {successMessage}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB' }}
                >
                    ALTERAR SENHA
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleBack}
                    sx={{ mt: 1, mb: 2, backgroundColor: 'white', color: '#000' }}
                >
                    Voltar
                </Button>
            </Box>
        </Container>
    );
};

export default ResetPassword;
