import { useState } from "react";
import { Grid, Paper, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthStore, useForm } from "../../hooks";


import logo from '../../assets/images/muserpol-logo-without-text.png';
import { ComponentButton, ComponentInput } from "../../components";

const loginFormFields = {
    username: '',
    password: '',
};

const formValidations = {
    username: [(value: any) => value.length >= 1, 'Debe ingresar su cuenta'],
    password: [(value: any) => value.length >= 4, 'La contraseña debe tener al menos 6 caracteres'],
};

export const AuthPage = () => {
    const { startlogin } = useAuthStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { username, password, onInputChange, isFormValid, usernameValid, passwordValid } = useForm(loginFormFields, formValidations);

    const loginSubmit = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid)
            return;
        setLoading(true);
        await startlogin({ username: username, password: password });
        setLoading(false);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Grid item xs={12} sm={6} component={Paper} elevation={6} square sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#ffffff', borderRadius: '8px' }}>
                <img src={logo} alt="Logo Muserpol" style={{ width: '60%', maxWidth: '200px', height: 'auto', marginBottom: '20px' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: 'black', textAlign: 'center', fontSize: '1.5rem' }}>
                    PLATAFORMA DE CONTROL Y SEGUIMIENTO EN ALMACENES
                </Typography>
                <form onSubmit={loginSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                    <ComponentInput
                        type="text"
                        label="Cuenta"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        error={!!usernameValid && formSubmitted}
                        helperText={formSubmitted ? usernameValid : ''}
                        fullWidth
                        size="small"
                        customSx={{ marginBottom: '15px' }}
                    />
                    <ComponentInput
                        type={showPassword ? 'text' : 'password'}
                        label="Contraseña"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        error={!!passwordValid && formSubmitted}
                        helperText={formSubmitted ? passwordValid : ''}
                        fullWidth
                        size="small"
                        endAdornment={
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        }
                        customSx={{ marginBottom: '15px' }}
                    />
                    <ComponentButton
                        type="submit"
                        text="INGRESAR"
                        variant="contained"
                        color="primary"
                        fullWidth
                        loading={loading}

                        margin="15px 0 0 0"
                        height="50px"
                        sx={{ marginTop: '15px', height: '50px' }}
                    />
                </form>
            </Grid>
        </Grid>
    );
};
