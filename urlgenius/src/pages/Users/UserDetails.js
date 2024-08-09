import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, MenuItem, IconButton, Menu } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from '../../utils/auth'; // Importa a instância do axios configurado

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        email: '',
        empresa: '',
        tipo: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get(`/user-profiles/${id}/`);
                setUserDetails(response.data);
                setFormData({
                    first_name: response.data.user.first_name,
                    email: response.data.user.email,
                    empresa: response.data.empresa ? response.data.empresa.id : '',
                    tipo: response.data.tipo
                });
            } catch (error) {
                console.error('Error fetching user details', error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await api.get('/companies/');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        };

        fetchUserDetails();
        fetchCompanies();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/user-profiles/${id}/`);
            navigate('/user-management');
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSave = async () => {
        const updateData = {};
        for (let key in formData) {
            if (formData[key] !== userDetails[key]) {
                updateData[key] = formData[key];
            }
        }

        try {
            await api.put(`/user-profiles/${id}/`, updateData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user details', error);
        }
    };

    if (!userDetails) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => navigate('/user-management')} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography component="h1" variant="h4">
                            Dados do Usuário
                        </Typography>
                    </Box>
                    <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEdit}>Editar Usuário</MenuItem>
                        <MenuItem onClick={handleDelete}>Excluir Usuário</MenuItem>
                    </Menu>
                </Box>
                <Box component="form" sx={{ width: '100%', maxWidth: '448px' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome do Funcionário"
                        name="name"
                        value={userDetails.user.first_name}
                        onChange={(e) => setUserDetails({ ...userDetails, user: { ...userDetails.user, first_name: e.target.value } })}
                        placeholder="Informe o nome do funcionário"
                        disabled={!isEditing} // Desativa o campo se não estiver no modo de edição
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email (Usuário)"
                        name="email"
                        type="email"
                        value={userDetails.user.email}
                        onChange={(e) => setUserDetails({ ...userDetails, user: { ...userDetails.user, email: e.target.value } })}
                        placeholder="Informe o email do usuário"
                        disabled={!isEditing} // Desativa o campo se não estiver no modo de edição
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="company"
                        select
                        label="Empresa"
                        name="company"
                        value={userDetails.empresa ? userDetails.empresa.id : ''}
                        onChange={(e) => setUserDetails({ ...userDetails, empresa: { ...userDetails.empresa, id: e.target.value } })}
                        placeholder="Vincule uma empresa ao usuário"
                        disabled={!isEditing} // Desativa o campo se não estiver no modo de edição
                    >
                        {userDetails.empresa && (
                            <MenuItem value={userDetails.empresa.id}>
                                {userDetails.empresa.nome}
                            </MenuItem>
                        )}
                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        select
                        label="Cargo"
                        name="role"
                        value={userDetails.tipo}
                        onChange={(e) => setUserDetails({ ...userDetails, tipo: e.target.value })}
                        placeholder="Selecione o cargo do usuário"
                        disabled={!isEditing} // Desativa o campo se não estiver no modo de edição
                    >
                        <MenuItem value="admin">Administrador</MenuItem>
                        <MenuItem value="employee">Funcionário</MenuItem>
                    </TextField>
                    {isEditing && (
                        <>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' }, height: 50 }}
                                onClick={handleSave}
                            >
                                SALVAR
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 1, mb: 2, height: 50, borderColor: '#828181', color: '#828181' }}
                                onClick={() => setIsEditing(false)} // Cancela a edição
                            >
                                VOLTAR
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default UserDetails;
