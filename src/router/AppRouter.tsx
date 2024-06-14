import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage } from '../views/auth/AuthPage';

export const AppRouter = () => {
    return (
        <AuthPage />
    )
}