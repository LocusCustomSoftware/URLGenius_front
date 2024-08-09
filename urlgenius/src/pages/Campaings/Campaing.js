import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Campaigns = () => {
    const navigate = useNavigate();

    const handleCreateCampaign = () => {
        navigate('/create-campaign');
    };

    const handleViewAllCampaigns = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', mb: 4, width: '100%' , marginBottom: 5}}>
                    <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h3">
                        Campanhas
                    </Typography>
                </Box>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleCreateCampaign}
                            sx={{ backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' }, height: 50, width:448 }}
                        >
                            CRIAR NOVA CAMPANHA
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleViewAllCampaigns}
                            sx={{ backgroundColor: '#fff', borderColor: '#fff', color: '#00B4CB', '&:hover': { backgroundColor: '#f0f0f0' }, height: 50, width:448 }}
                        >
                            VER TODAS AS CAMPANHAS
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Campaigns;
