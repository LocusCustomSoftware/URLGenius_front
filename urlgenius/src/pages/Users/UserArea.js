import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const UserArea = () => {
    const navigate = useNavigate();

    const handleCreateUser = () => {
        navigate('/create-user');
    };

    const handleManageUser = () => {
        navigate('/user-management')
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                    Área de Usuários
                </Typography>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleCreateUser}
                            sx={{ backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' }, height: 50, width:448 }}
                        >
                            CRIAR NOVO USUÁRIO
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleManageUser}
                            sx={{ backgroundColor: '#fff', borderColor: '#fff', color: '#00B4CB', '&:hover': { backgroundColor: '#f0f0f0' }, height: 50, width:448 }}
                        >
                            GERENCIAMENTO DE USUÁRIOS
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserArea;
