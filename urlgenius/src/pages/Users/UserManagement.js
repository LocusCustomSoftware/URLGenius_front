import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, IconButton, Paper, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/auth'; // Importa a instância do axios configurado

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await api.get('/user-profiles/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleRowClick = (params) => {
        navigate(`/user-details/${params.id}`);
    };

    const columns = [
        { field: 'name', headerName: 'Nome do Funcionário', width: 200 },
        { field: 'email', headerName: 'E-mail', width: 200 },
        { field: 'company', headerName: 'Empresa', width: 200 },
        { field: 'role', headerName: 'Cargo', width: 150 }
    ];

    const rows = users
        .filter((user) => 
            user.user.first_name.toLowerCase().includes(searchText.toLowerCase()) || 
            user.user.email.toLowerCase().includes(searchText.toLowerCase()) || 
            (user.empresa && user.empresa.nome && user.empresa.nome.toLowerCase().includes(searchText.toLowerCase())) || 
            user.tipo.toLowerCase().includes(searchText.toLowerCase())
        )
        .map(user => ({
            id: user.user.id,
            name: user.user.first_name,
            email: user.user.email,
            company: user.empresa ? user.empresa.nome : 'N/A',
            role: user.tipo
        }));

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate('/user-area')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4">
                        Gerenciamento de Usuários
                    </Typography>
                </Box>
                <Paper sx={{ p: 3 }}>
                    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        Lista de Usuários
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Name, email, etc..."
                        value={searchText}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSearchText('')}>
                                        <DeleteIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            onRowClick={handleRowClick}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default UserManagement;
