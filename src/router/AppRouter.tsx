import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks';

import { AuthPage } from '../views/auth/AuthPage';
import { Layout } from '../views/layout/Layout';

/* Rutas */

import { SupplierView } from '../views/pages/Suppliers';
import { ClassifierView } from '../views/pages/Classifiers';
import { GroupTableSec } from '../views/pages/Groups';
import { MaterialView } from '../views/pages/Materials';
import { Dashboard } from '../views/pages/Dashboard';
import { CreateNote } from '../views/pages/Note_Entry/CreateNote';
import { NoteEntryView } from '../views/pages/Note_Entry';
import { NoteRequestView } from '../views/pages/Note_Request';
import { UsersView } from '../views/pages/Users';
import { ExistenceCard, ValuedPhysical, ValuedPhysicalConsolided } from '../views/pages/Reports';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, []);
    return (
        (status === 'not-authenticated') ?
            <AuthPage />
            :
            <Layout>
                <Routes>
                    <Route path='/dashboardView' element={<Dashboard />} />
                    <Route path='/supplierView' element={<SupplierView />} />
                    <Route path='/classifierView' element={<ClassifierView />} />
                    <Route path='/groupView' element={<GroupTableSec />} />
                    <Route path='/materialsView' element={<MaterialView />} />
                    <Route path='/entryView' element={<NoteEntryView />} />
                    <Route path='/createNote' element={<CreateNote />} />
                    <Route path='/requestView' element={<NoteRequestView />} />
                    <Route path='/reportExistence' element={<ExistenceCard />} />
                    <Route path='/reportValuedPhysical' element={<ValuedPhysical />} />
                    <Route path='/reportValuedPhysicalConsolided' element={<ValuedPhysicalConsolided />} />
                    <Route path='/usersView' element={<UsersView />} />
                    <Route path='/*' element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}