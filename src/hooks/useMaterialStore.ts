import { coffeApi } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { setMaterial, refreshMaterial } from "../store";
import Swal from "sweetalert2";

const api = coffeApi;

export const useMaterialStore = () => {
    const { materials, flag } = useSelector((state: any) => state.materials);
    const dispatch = useDispatch();


    const getMaterial = async (page: number, limit: number, search: string) => {

        let filter: any = { params: { page: page } };
        if (limit != -1) filter.params.limit = limit;
        if (search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/materialslist', filter);
        dispatch(setMaterial({ materials: data.materials }))
        //console.log(data);
        return data.total;
    }

    const postMaterial = async (body: Object) => {
        //console.log(body);
        try {
            await api.post('/auth/materials', body);
            dispatch(refreshMaterial());
            Swal.fire('Material Creado Correctamente !!! ', '', 'success');
            return true;
        } catch (error: any) {
            if (error.response && error.response.status == 403){
                const message = error.response;
                Swal.fire('Acceso Denegado', message, 'warning')
            }else{
                const message = error.response.data.error
                Swal.fire('Error', message, 'error');
            }

            return false;
        }
    }

    return {
        materials,
        flag,

        postMaterial,
        getMaterial
    }
}