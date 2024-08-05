import { coffeApi } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { setMaterial, refreshMaterial, setLeakedMaterials, setClearLeakedMaterials, setMater } from "../store";
import Swal from "sweetalert2";
import { MaterialModel } from "../models";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useMaterialStore = () => {
    const { materials, materialview, flag, leakedMaterials } = useSelector((state: any) => state.materials);
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

    const getMaterial_petty_cash = async (page: number, limit: number, search: string) => {

        let filter: any = { params: { page: page } };
        if (limit != -1) filter.params.limit = limit;
        if (search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/materialslistpettycash', filter);
        dispatch(setMaterial({ materials: data.materials }))
        //console.log(data);
        return data.total;
    }

    const postMaterial = async (body: Object) => {
        try {
            // Realiza la solicitud POST al endpoint '/auth/materials'
            await api.post('/auth/materials', body);

            // Actualiza el estado de los materiales (si es necesario)
            dispatch(refreshMaterial());

            // Muestra un mensaje de éxito
            Swal.fire('Material Creado Correctamente !!!', '', 'success');
            return true;
        } catch (error: any) {
            // Manejo de errores
            if (error.response) {
                const { status, data } = error.response;

                if (status === 403) {
                    // Mensaje de acceso denegado
                    Swal.fire('Acceso Denegado', data.message || 'No tienes permiso para realizar esta acción.', 'warning');
                } else {
                    // Mensaje de error general
                    const message = data.error || 'Ocurrió un error inesperado.';
                    Swal.fire('Error', message, 'error');
                }
            } else {
                // Manejo de errores no relacionados con la respuesta HTTP (por ejemplo, errores de red)
                Swal.fire('Error', 'Ocurrió un error inesperado. Por favor, verifica tu conexión a internet.', 'error');
            }

            return false;
        }
    };


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

    const patchMaterial = async (id: number, body: object) => {
        try {
            await api.patch(`/auth/updateName/${id}/`, body);
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

    const viewMaterial = async (material: MaterialModel) => {
        return api.get(`/auth/materials/${material.id}/`)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error al obtener el material:', error);
                throw error;
            });
    }

    return {
        materials,
        flag,
        leakedMaterials,
        materialview,

        postMaterial,
        getMaterial,
        putState,
        deleteMaterial,
        viewMaterial,
        getMaterial_petty_cash,
        patchMaterial,
    }
}