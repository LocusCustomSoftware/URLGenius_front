import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginSide = () => (
    <Box className="login-left">
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', maxWidth: '600px' }}>
            <Typography component="h1" variant="h5" sx={{ fontSize: '2rem', fontFamily: 'monospace' }}>
                Bem-vindo ao URLGenius!
            </Typography>
            <p></p>
            <Typography component="h1" variant="h5" sx={{ fontSize: '1rem', fontFamily: 'monospace' }}>
                Aqui você pode criar, editar e monitorar suas URLs personalizadas para campanhas de marketing com facilidade.
            </Typography>
        </div>
    </Box>
);

export default LoginSide;
