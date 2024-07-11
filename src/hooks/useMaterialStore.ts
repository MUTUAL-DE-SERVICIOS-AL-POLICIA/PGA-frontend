import { coffeApi } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { setMaterial, refreshMaterial, setLeakedMaterials, setClearLeakedMaterials } from "../store";
import Swal from "sweetalert2";
import { MaterialModel } from "../models";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useMaterialStore = () => {
    const { materials, flag, leakedMaterials } = useSelector((state: any) => state.materials);
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
        console.log(body);
        try {
            await api.post('/auth/materials', body);
            dispatch(refreshMaterial());
            Swal.fire('Material Creado Correctamente !!! ', '', 'success');
            return true;
        } catch (error: any) {
            if (error.response && error.response.status == 403) {
                const message = error.response;
                Swal.fire('Acceso Denegado', message, 'warning')
            } else {
                const message = error.response.data.error
                Swal.fire('Error', message, 'error');
            }

            return false;
        }
    }

    const putState = async (id: number, stateup: string) => {
        let data: { state?: string } = { state: stateup }
        try {
            await api.patch(`/auth/materials/${id}/`, data);
            dispatch(refreshMaterial());
            Swal.fire('Actualizado', '', 'success');
            return true;
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    const message = error.response.data.message;
                    Swal.fire('No permite', message, 'warning');
                }
            }
        }

    }

    const deleteMaterial = async (material: MaterialModel) => {
        const { dialogDelete } = DialogComponent();
        const state = await dialogDelete(`Se eliminara el material ${material.description}`);
        if (state) {
            try {
                await api.delete(`/auth/materials/${material.id}`);
                dispatch(refreshMaterial());
                Swal.fire(
                    `¡Eliminado!`,
                    `${material.description} fue eliminado`,
                    'success'
                );
            } catch (error) {

            }
        }
    }

    return {
        materials,
        flag,
        leakedMaterials,

        postMaterial,
        getMaterial,
        putState,
        deleteMaterial
    }
}