import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Simular a validação básica dos campos
        if (!formData.username || !formData.email) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Simular a lógica de adicionar usuário (pode ser substituído com uma chamada a API real)
        // Aqui, estamos apenas exibindo uma mensagem de sucesso após 1 segundo
        setTimeout(() => {
            setSuccessMessage('Usuário adicionado com sucesso!');
            setFormData({
                username: '',
                email: '',
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
                    Criar Usuário
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="username"
                    name="username"
                    label="Nome do Usuário"
                    value={formData.username}
                    placeholder='Informe o nome do usuário'
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    placeholder='Informe o email do usuário'
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
                    Criar Usuário
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleBack}
                    sx={{ mt: 1, mb: 2, backgroundColor: 'white', color: '#00B4CB' }}
                >
                    Voltar
                </Button>
            </Box>
        </Container>
    );
};

export default AddUser;
