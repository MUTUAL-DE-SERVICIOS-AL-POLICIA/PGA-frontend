import Swal from "sweetalert2";
import { coffeApi } from "../services"
import { setUserStore, refreshUserStore } from "../store";
import { useDispatch, useSelector } from "react-redux"
const api = coffeApi;

export const useUserStore = () => {
    const { user_stores = [], flag } = useSelector((state: any) => state.user_stores);

    const dispatch = useDispatch();


    const getUserStore = async () => {
        const data = await api.get('/auth/listUser');
        dispatch(setUserStore({ user_stores: data.data }))
        return data;
    }

    const postUserStore = async (body: Object) => {
        try {
            await api.post('/auth/newStoreUser', body);
            dispatch(refreshUserStore());
            Swal.fire('Actualizacion Correcta', '', 'success');
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    const message = error.response.data.detail || 'Acceso denegado';
                    Swal.fire('Acceso denegado', message, 'warning');
                } else {
                    const message = error.response.data.error || 'Error desconocido';
                    Swal.fire('Error', message, 'error');
                }
            } else {
                Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
            }
            return false;
        }
    }

    return {
        user_stores,
        flag,
        getUserStore,
        postUserStore,

    }

}