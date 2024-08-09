import React, { useState, useEffect } from 'react';
import api from '../../utils/auth';
import { Container, Box, Typography, TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await api.get('/companies/');
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
            const response = await api.post('/users-create/', {
                user: {
                    username: email,
                    email: email,
                    first_name: name,
                    password: password
                },
                empresa: company,
                tipo: role,
            });
            setSuccessMessage(`Usuário "${response.data.user.username}" foi criado com sucesso. Não se preocupe, um email com os dados do usuário criado, já foi enviado automaticamente.`);
            setOpen(true);
        } catch (error) {
            console.error('Error creating user', error);
            setErrorMessage('Erro ao criar usuário. Por favor, tente novamente.');
            setOpenError(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenError(false);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', mb: 4, width: '100%' }}>
                    <IconButton onClick={() => navigate('/user-area')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4">
                        Criar Usuário
                    </Typography>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {successMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        sx={{ width: '448px' }} 
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
                        sx={{ width: '448px' }} 
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
                        sx={{ width: '448px' }} 
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
                        sx={{ width: '448px' }} 
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
                        sx={{ width: '448px' }} 
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' }, height: 50, width: '448px' }}
                    >
                        CRIAR USUÁRIO
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1, mb: 2, height: 50, borderColor: '#828181', color: '#828181', width: '448px' }}
                        onClick={() => navigate('/user-area')} // Volta para a página anterior
                    >
                        VOLTAR
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateUser;
