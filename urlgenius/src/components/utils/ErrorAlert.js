import React from 'react';
import { Alert } from '@mui/material';

const ErrorAlert = ({ error }) => (
    error ? <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert> : null
);

export default ErrorAlert;
