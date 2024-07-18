import React from 'react';
import { TextField } from '@mui/material';

const TextInputField = ({ id, label, name, autoComplete, value, onChange }) => (
    <TextField
        margin="normal"
        required
        fullWidth
        id={id}
        label={label}
        name={name}
        autoComplete={autoComplete}
        autoFocus
        value={value}
        onChange={onChange}
    />
);

export default TextInputField;
