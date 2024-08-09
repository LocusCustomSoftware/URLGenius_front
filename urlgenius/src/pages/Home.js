import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Modal,
  Button,
  Box,
} from '@mui/material';
import { Edit, Delete, AddCircle, Search } from '@mui/icons-material';
import './Home.css';

const AddCampaignModal = ({ open, handleClose, handleAdd }) => {
  const [campaignName, setCampaignName] = useState('');
  const [empresa, setEmpresa] = useState('');

  const handleInputChange = (e) => {
    if (e.target.name === 'nome') {
      setCampaignName(e.target.value);
    } else if (e.target.name === 'empresa') {
      setEmpresa(e.target.value);
    }
  };

  const handleSubmit = () => {
    handleAdd(campaignName, empresa);
    setCampaignName('');
    setEmpresa('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" paddingBottom={'15px'} gutterBottom>
          Criar Campanha
        </Typography>
        <TextField
          label="Nome da Campanha"
          variant="outlined"
          fullWidth
          name="nome"
          value={campaignName}
          onChange={handleInputChange}
          autoFocus
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Adicionar
          </Button>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const Home = () => {
  const [campanhas, setCampanhas] = useState([
    { id: 1, nome: 'Campanha de Verão', dataCriacao: '2023-06-15', criadoPor: 'João', empresa: 'Empresa A' },
    { id: 2, nome: 'Promoção de Inverno', dataCriacao: '2023-07-20', criadoPor: 'Maria', empresa: 'Empresa B' },
    { id: 3, nome: 'Desconto de Primavera', dataCriacao: '2023-08-05', criadoPor: 'José', empresa: 'Empresa C' },
  ]);

  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const filtrarCampanhas = (termo) => {
    setFiltro(termo);
  };

  const handleAddCampaign = (nome, empresa) => {
    const newCampaign = {
      id: campanhas.length + 1,
      nome: nome,
      dataCriacao: new Date().toISOString().slice(0, 10), // Example: Current date as ISO string
      criadoPor: 'Usuário Atual', // Replace with actual logged-in user
      empresa: empresa,
    };
    setCampanhas([...campanhas, newCampaign]);
  };

  const campanhasFiltradas = campanhas.filter((campanha) =>
    campanha.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const openAddCampaignModal = () => {
    setOpenModal(true);
  };

  const closeAddCampaignModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="home-container">
      <Typography variant="h5" className="campaigns-title" gutterBottom>
        Minhas Campanhas
      </Typography>
      <Paper component="form" className="campaigns-toolbar">
        <TextField
          label="Pesquisar Campanha"
          variant="outlined"
          size="small"
          fullWidth
          value={filtro}
          onChange={(e) => filtrarCampanhas(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          aria-label="Adicionar Campanha"
          className="add-button"
          onClick={openAddCampaignModal}
        >
          <AddCircle />
        </IconButton>
      </Paper>
      {loading && <CircularProgress />}

      <Grid container spacing={3} className="campaigns-grid">
        {campanhasFiltradas.map((campanha) => (
          <Grid item xs={12} sm={6} md={4} key={campanha.id}>
            <Card className="campaign-card">
              <Link to={`/campaigns/${campanha.id}`} className="campaign-link">
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {campanha.nome}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Criado em: {campanha.dataCriacao}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Criado por: {campanha.criadoPor}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Empresa: {campanha.empresa}
                  </Typography>
                  <div className="campaign-actions">
                    <IconButton aria-label="Editar">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="Excluir">
                      <Delete />
                    </IconButton>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddCampaignModal
        open={openModal}
        handleClose={closeAddCampaignModal}
        handleAdd={handleAddCampaign}
      />
    </div>
  );
};

export default Home;
