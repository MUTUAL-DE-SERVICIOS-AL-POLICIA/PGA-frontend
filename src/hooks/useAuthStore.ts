import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "../services";
import { onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user } = useSelector((state: any) => state.auth);
    const dispatach = useDispatch();

    const startlogin = async({ username, password }: { username: string, password: string }) =>{
        try {
            const { data } = await coffeApi.post('/api/auth/login', {username, password});
        } catch (error) {
            
        }
    }

    

    return {
        status,
        user,
    }
}