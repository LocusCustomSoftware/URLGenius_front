import React from 'react';
import TextInputField from '../../components/TextInputField';
import PasswordField from '../../components/PasswordField';
import FooterLinks from './FooterLinks';
import { Button, Alert } from '@mui/material';

import logoImage from '../../utils/images/logo.png';

const LoginForm = ({ username, setUsername, password, setPassword, error, handleSubmit }) => (
    <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
            <img src={logoImage} alt="Logo" className="logo-image" />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <TextInputField
                id="username"
                label="Usuário"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordField
                id="password"
                label="Senha"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <FooterLinks />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#00B4CB', '&:hover': { backgroundColor: '#0099A8' } }}
            >
                Entrar
            </Button>
            <p className="contact">Não tem uma conta? <a href="/contact">Entre em contato.</a></p>
        </form>
    </div>
);

export default LoginForm;
