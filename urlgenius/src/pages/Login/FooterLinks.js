import React from 'react';
import { Grid, FormControlLabel, Checkbox, Link } from '@mui/material';

const FooterLinks = () => (
    <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar de mim"
            />
        </Grid>
        <Grid item>
            <Link href="/forgot-password" variant="body2">
                Esqueceu sua senha?
            </Link>
        </Grid>
    </Grid>
);

export default FooterLinks;
