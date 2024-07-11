import { useDispatch, useSelector } from "react-redux"
import { coffeApi } from "../services";
import { setTypes } from "../store";
import Swal from "sweetalert2";

const api = coffeApi;

export const useTypeStore = () => {
    const { types, flag } = useSelector((state: any) => state.types);
    const dispatch = useDispatch();

    const getTypes = async () => {
        try {
            const { data } = await api.get('/auth/types/');
            //console.log(data);  
            dispatch(setTypes({ types: data }));
            //console.log(dispatch(setTypes({ types: data })));
            return data.total;
        } catch (error: any) {
            if (error.response && error.response.status == 400) {
                const message = error.response.data.error
                Swal.fire('Error', message, 'error')
            } else if (error.response && error.response.status == 403) {
                const message = error.response.data.detail
                Swal.fire('Acceso denegado', message, 'warning')
            } else throw new Error('Ocurrió algun error en el backend')
        }

    }

    return {
        types,
        flag,

        getTypes
    }
}