import React, { useState } from 'react';
import { Grid } from '@mui/material';
import LoginForm from './LoginForm';
import LoginSide from './LoginSide';
import { createPasswordHandler } from '../../utils/api/Login/Login';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { handleClickShowPassword, handleMouseDownPassword } = createPasswordHandler(showPassword, setShowPassword);

    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await api.post('login/', {
            //     username,
            //     password,
            // });
            login();
            localStorage.setItem('isAuthenticated', true);
            // Salva os tokens no localStorage
            // localStorage.setItem('access_token', response.data.access);
            // localStorage.setItem('refresh_token', response.data.refresh);

            navigate('/');  // Redireciona para a página inicial
        } catch (error) {
            setError('Nome de usuário ou senha incorretos');
            console.error('There was an error!', error);
        }
    };

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     handleSubmit(username, password, setError);  // Usa a função externa de lógica
    // };

    return (
        <div
            className="login-container"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                minHeight: '100vh',
            }}
        >
            <Grid container sx={{ flex: 1 }}>
                <Grid item xs={12} sm={6} md={6} className='login-side-grid'>
                    <LoginSide />
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
                    <LoginForm
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        error={error}
                        handleSubmit={onSubmit}  // Passa a função de envio do formulário
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
