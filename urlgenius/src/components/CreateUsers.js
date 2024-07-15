import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Container, Box, Typography, TextField, Button, MenuItem } from '@mui/material';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [companies, setCompanies] = useState([]);
    const [roles, setRoles] = useState([
        { value: 'admin', label: 'Administrador' },
        { value: 'employee', label: 'Funcionário' }
    ]);

    useEffect(() => {
        // Fetch companies from the API
        const fetchCompanies = async () => {
            try {
                const response = await api.get('api/users/companies/');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('api/users/users/', {
                user: {
                    username: email,
                    email: email,
                    first_name: name,
                    password: password
                },
                empresa: company,
                tipo: role,
            });
            console.log('User created successfully:', response.data);
            // Redirecionar ou fazer alguma ação após criação bem-sucedida
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography component="h1" variant="h5">
                    Criar Usuário
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome do Funcionário"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Informe o nome do funcionário"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email (Usuário)"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Informe o email do usuário"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="company"
                        select
                        label="Empresa"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Vincule uma empresa ao usuário"
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        select
                        label="Cargo"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Selecione o cargo do usuário"
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.value} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Primeira Senha"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Informe uma senha para o primeiro acesso do usuário"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' } }}
                    >
                        CRIAR USUÁRIO
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => window.history.back()} // Volta para a página anterior
                    >
                        VOLTAR
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateUser;
