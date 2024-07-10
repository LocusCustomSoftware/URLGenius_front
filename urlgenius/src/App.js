import React, { useState, useEffect } from 'react';
import api from './utils/api'; // Importe o arquivo de configuração do Axios
import logo from './logo.svg';
import './App.css';

function App() {
  const [dadosDoBackend, setDadosDoBackend] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('api/exemplo/');
        setDadosDoBackend(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Exemplo de integração React + Django
        </p>
        {dadosDoBackend ? (
          <div>
            <h2>Dados Recebidos do Backend:</h2>
            <ul>
              {dadosDoBackend.map((item) => (
                <li key={item.id}>{item.nome}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Carregando dados do backend...</p>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
