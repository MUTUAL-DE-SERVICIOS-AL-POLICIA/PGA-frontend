import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "../services";
import { onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const startlogin = async ({ username, password }: { username: string, password: string }) => {
        try {
            const { data } = await coffeApi.post('/auth/login', { username, password });
            console.log(data);
            localStorage.setItem('token', data.token);
            const user = data.user;
            localStorage.setItem('id', data.id);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('rol', data.role);
            localStorage.setItem('permission', data.permissions);
            dispatch(onLogin(user));
        } catch (error: any) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
            dispatch(onLogout());
            const message = error.response?.data?.message || 'Error desconocido';
            Swal.fire('Error', message, 'error');
        }
    };


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = localStorage.getItem('user');
            return dispatch(onLogin(user));
        } else {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    return {
        status,
        user,
        startlogin,
        checkAuthToken,
        startLogout
    };
};
