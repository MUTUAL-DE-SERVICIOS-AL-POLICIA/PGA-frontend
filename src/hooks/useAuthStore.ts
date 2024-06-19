import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "../services";
import { onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const startlogin = async({ username, password }: { username: string, password: string }) =>{
        try {
           console.log('datos ingresados', {username, password});
           const { data } = await coffeApi.post('/auth/login', { username, password });
           console.log('Response data:', data);
           localStorage.setItem('token', data.token);
           const user = data.user;
           localStorage.setItem('user',JSON.stringify(user));
           localStorage.setItem('rol',data.role);
           dispatch(onLogin(user));
           //console.log(status)
           
        } catch (error: any) {
            dispatch(onLogout());
            const message = error.response.data.message;
            Swal.fire('Error', message, 'error')
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
    
        if (token) {
          const user = localStorage.getItem('user')
          return dispatch(onLogin(user));
        } else {
          localStorage.clear();
          dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    

    return {
        status,
        user,

        startlogin,
        checkAuthToken,
        startLogout
    }
}