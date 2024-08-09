import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, TextField, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const CampaignCreation = () => {
    const navigate = useNavigate();
    const [campaignCreationMethod, setCampaignCreationMethod] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleBack = () => {
        navigate('/create-campaign');
    };

    const handleIA = () => {
        setCampaignCreationMethod('IA');
    };

    const handleManual = () => {
        setCampaignCreationMethod('Manual');
    };

    const handleNext = () => {
        // Lógica de navegação ou submissão aqui
        if (campaignCreationMethod === 'IA') {
            console.log("Criar Campanha com IA");
            // Navegar para o próximo passo ou submeter o formulário
        } else if (campaignCreationMethod === 'Manual') {
            console.log("Criar Campanha Manualmente");
            // Navegar para o próximo passo ou submeter o formulário
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("Arquivo selecionado:", event.target.files[0]);
    };

    const triggerFileInput = () => {
        document.getElementById('file-input').click();
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
                <Stepper activeStep={1} alternativeLabel>
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

                {!campaignCreationMethod ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={handleIA}
                            sx={{
                                color: '#00B4CB',
                                borderColor: '#00B4CB',
                                borderRadius: 10,
                                width: '300px',
                            }}
                        >
                            Criar Campanha com IA
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleManual}
                            sx={{
                                color: '#00B4CB',
                                borderColor: '#00B4CB',
                                borderRadius: 10,
                                width: '300px',
                            }}
                        >
                            Criar Campanha Manualmente
                        </Button>
                    </Box>
                ) : (
                    <Box component="form" sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                            <Button
                                variant={campaignCreationMethod === 'IA' ? 'contained' : 'outlined'}
                                onClick={handleIA}
                                sx={{
                                    color: campaignCreationMethod === 'IA' ? '#fff' : '#00B4CB',
                                    backgroundColor: campaignCreationMethod === 'IA' ? '#00B4CB' : 'transparent',
                                    borderColor: '#00B4CB',
                                    borderRadius: 10,
                                    width: '300px',
                                }}
                            >
                                Criar com IA
                            </Button>
                            <Button
                                variant={campaignCreationMethod === 'Manual' ? 'contained' : 'outlined'}
                                onClick={handleManual}
                                sx={{
                                    color: campaignCreationMethod === 'Manual' ? '#fff' : '#00B4CB',
                                    backgroundColor: campaignCreationMethod === 'Manual' ? '#00B4CB' : 'transparent',
                                    borderColor: '#00B4CB',
                                    borderRadius: 10,
                                    width: '300px',
                                }}
                            >
                                Criar Manualmente
                            </Button>
                        </Box>

                        {campaignCreationMethod === 'IA' && (
                            <>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={6}
                                    placeholder="Aqui você pode inserir instruções para a IA."
                                    label="Instruções para a IA URL Genius"
                                    variant="outlined"
                                    sx={{ mb: 4 }}
                                />
                                <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                                    ou
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                                    <Button
                                        startIcon={<AttachFileIcon />}
                                        sx={{ color: '#00B4CB' }}
                                        onClick={triggerFileInput}
                                    >
                                        ANEXAR ARQUIVO
                                    </Button>
                                    <input
                                        type="file"
                                        id="file-input"
                                        style={{ display: 'none' }}
                                        onChange={handleFileSelect}
                                    />
                                </Box>
                                {selectedFile && (
                                    <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                                        Arquivo selecionado: {selectedFile.name}
                                    </Typography>
                                )}
                            </>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 25}}>
                            <Button
                                variant="outlined"
                                onClick={handleBack}
                                sx={{ color: '#828181', borderColor: '#828181', width: '330px', mr: 2 }}
                            >
                                VOLTAR
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{
                                    backgroundColor: '#00B4CB',
                                    '&:hover': { backgroundColor: '#0099A8' },
                                    width: '330px',
                                }}
                            >
                                AVANÇAR
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default CampaignCreation;
