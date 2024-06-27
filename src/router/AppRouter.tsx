import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks';

import { AuthPage } from '../views/auth/AuthPage';
import { Layout } from '../views/layout/Layout';

/* Rutas */

import { SupplierView } from '../views/pages/Suppliers';
import { ClassifierView } from '../views/pages/Classifiers';
import { GroupView } from '../views/pages/Groups';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, []);
    return (
        (status=== 'not-authenticated') ?
            <AuthPage /> 
            : 
            <Layout>
                <Routes>
                    <Route path='/supplierView' element={<SupplierView/>}/>
                    <Route path='/classifierView' element={<ClassifierView/>} />
                    <Route path='/groupView' element={<GroupView/>}/>
                </Routes>
            </Layout>
    )
}