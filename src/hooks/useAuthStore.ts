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
        } catch (error: any) {
            dispatch(onLogout());
            const message = "error"
            Swal.fire('Error', message, 'error')
        }
    }

    

    return {
        status,
        user,

        startlogin
    }
}