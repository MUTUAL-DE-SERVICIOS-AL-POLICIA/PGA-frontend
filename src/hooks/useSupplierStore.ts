import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setSupplier } from "../store/Supplier/supplierSlice";
import Swal from "sweetalert2";
import { SupplierModel } from "../models";

const api = coffeApi;

export const useSupplierStore = () => {
    const { suppliers, flag } = useSelector((state: any) => state.suppliers);
    const dispatch = useDispatch();

    const getSuppliers = async (page: number, limit: number) => {
        try {
            let filter: any = { params: { page: page } };
            if (limit != -1) filter.params.limit = limit;
            const { data } = await api.get('/auth/suppliers/', filter);
            dispatch(setSupplier({ suppliers: data.suppliers }));
            return data.total;
        } catch (error: any) {
            if (error.response && error.response.status == 400) {
                const message = "error"
                Swal.fire('Error', message, 'error')
            } else if (error.response && error.response.status == 403) {
                const message = "error.response.data.detail"
                Swal.fire('Acceso denegado', message, 'warning')
            } else throw new Error('Ocurrió algun error en el backend')
        }
    }

    const postSupllier = async (boby: Object) =>{
        try {
            const { data } = await api.post('/auth/suppliers/',boby);
            console.log(data);
        } catch (error) {
            console.log("falso");
            return false;
        }
    }



    return {
        suppliers,
        flag,

        getSuppliers,
        postSupllier
    }
}