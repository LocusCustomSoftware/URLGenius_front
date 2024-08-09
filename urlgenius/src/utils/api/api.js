// src/utils/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',  // URL base do seu backend Django
  timeout: 10000,  // Timeout opcional
  headers: {
    'Content-Type': 'application/json',
    // Adicione quaisquer headers necessários aqui
  },
});

export default api;
