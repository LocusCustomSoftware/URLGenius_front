import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const NewCampaign = () => {
    const navigate = useNavigate();
    const [campaignData, setCampaignData] = useState({
        mediaPlanName: '',
        clientName: '',
        mediaPlanID: '',
        campaignName: '',
        mediaPlanLink: '',
    });

    const handleChange = (e) => {
        setCampaignData({
            ...campaignData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        navigate('/campaigns');
    };

    const handleNext = () => {
        navigate('/campaing-choice')
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={handleBack} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4">
                        Nova Campanha
                    </Typography>
                </Box>
                <Stepper activeStep={0} alternativeLabel>
                    <Step key="Dados da Campanha">
                        <StepLabel
                            StepIconComponent={() => (
                                <CheckCircleIcon sx={{ color: '#00B4CB' }} />
                            )}
                        >
                            Dados da Campanha
                        </StepLabel>
                    </Step>
                    <Step key="Criação da Campanha">
                        <StepLabel
                            StepIconComponent={() => (
                                <RadioButtonUncheckedIcon sx={{ color: '#828181' }}>
                                    2
                                </RadioButtonUncheckedIcon >
                            )}
                        >
                            Criação da Campanha
                        </StepLabel>
                    </Step>
                </Stepper>
                <Box component="form" sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            required
                            id="mediaPlanName"
                            name="mediaPlanName"
                            label="Nome do Plano de Mídia"
                            placeholder="Informe o nome do plano de mídia"
                            value={campaignData.mediaPlanName}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            required
                            id="clientName"
                            name="clientName"
                            label="Cliente"
                            placeholder="Informe o nome do cliente"
                            value={campaignData.clientName}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            required
                            id="mediaPlanID"
                            name="mediaPlanID"
                            label="ID Plano de Mídia"
                            placeholder="Informe o ID do plano de mídia"
                            value={campaignData.mediaPlanID}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            required
                            id="campaignName"
                            name="campaignName"
                            label="Campanha"
                            placeholder="Informe o nome da campanha"
                            value={campaignData.campaignName}
                            onChange={handleChange}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        required
                        id="mediaPlanLink"
                        name="mediaPlanLink"
                        label="Link do Plano de Mídia"
                        placeholder="Insira o link para o plano de mídia"
                        value={campaignData.mediaPlanLink}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt:35}}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            sx={{ color: '#828181', borderColor: '#828181' , width: '330px', mr:2}}
                            
                        >
                            VOLTAR
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8'},width: '330px' }}
                        >
                            AVANÇAR
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default NewCampaign;