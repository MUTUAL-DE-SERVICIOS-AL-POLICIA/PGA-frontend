import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setSupplier, refreshSupplier } from "../store/Supplier/supplierSlice";
import Swal from "sweetalert2";
import { SupplierModel } from "../models";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useSupplierStore = () => {
    const { suppliers, flag } = useSelector((state: any) => state.suppliers);
    const dispatch = useDispatch();

    const getSuppliers = async (page: number, limit: number, search: string) => {
        let filter: any = { params: { page: page } };
        if (limit != -1) filter.params.limit = limit;
        if (search != '') filter.params.search = search;
        const { data } = await api.get('/auth/suppliers/', filter);
        dispatch(setSupplier({ suppliers: data.suppliers }));
        return data.total;
    }

    const getSuppliersList = async () =>{
        const { data } = await api.get('/auth/suppliers/');
        dispatch(setSupplier({ suppliers: data.suppliers }));
        return data.total;
    }

    const postSupllier = async (body: Object) => {
        try {
            await api.post('/auth/suppliers', body);
            dispatch(refreshSupplier());
            Swal.fire('Proveedor creado correctamente', '', 'success');
            return true;
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

    const patchUpdateSupplier = async (id: number, body: object) => {
        try {
            await api.patch(`/auth/suppliers/${id}/`, body);
            dispatch(refreshSupplier());
            Swal.fire('Proveedor Actualizado', '', 'success');
            return true;
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

    const deleteSupplier = async (supplier: SupplierModel) => {
        const { dialogDelete } = DialogComponent();
        const state = await dialogDelete(`Se eliminara al proveedor ${supplier.name}`);
        if (state) {
            try {
                await api.delete(`/auth/suppliers/${supplier.id}`);
                dispatch(refreshSupplier());
                Swal.fire(
                    `¡Eliminado!`,
                    `${supplier.name} fue eliminado`,
                    'success'
                );
            } catch (error) {

            }
        }
    }





    return {
        suppliers,
        flag,

        getSuppliers,
        postSupllier,
        patchUpdateSupplier,
        deleteSupplier,
        getSuppliersList,
    }
}