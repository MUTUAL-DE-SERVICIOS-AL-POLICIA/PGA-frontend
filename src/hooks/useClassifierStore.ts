import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setClassifier, refreshClassifier } from "../store";
import { ClassifierModel } from "../models";
import Swal from "sweetalert2";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useClassifierStore = () => {
    const { classifiers, flag } = useSelector((state: any) => state.classifiers);
    const dispatch = useDispatch();

    const getClassifier = async () => {
        try {
            const { data } = await api.get('/auth/classifiers')
            dispatch(setClassifier({ classifiers: data.classifiers }))
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


    const postCreateClassifier = async (body: object) => {
        try {
            console.log(body);
            await api.post('/auth/classifiers/', body);
            dispatch(refreshClassifier());
            Swal.fire('Clasificador creado correctamente !', '', 'success');
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

    const patchUpdateClassifier = async(id: number, body:object)=>{
        try {
           await api.patch(`/auth/classifiers/${id}/`, body);
           dispatch(refreshClassifier());
           Swal.fire('Clasificador Editado', '', 'success');
           return true; 
        } catch (error:any) {
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

    const deleleClassifier = async (classifier: ClassifierModel) =>{
        const {dialogDelete} = DialogComponent();
        const state = await dialogDelete(`Se Eliminara el clasificador ${classifier.nombre}`);
        if(state){
            await api.delete(`/auth/classifiers/${classifier.id}`);
            dispatch(refreshClassifier());
            Swal.fire('Eliminado', `${classifier.nombre}`, 'success');
        }
    }


    return {
        classifiers,
        flag,

        getClassifier,
        postCreateClassifier,
        patchUpdateClassifier,
        deleleClassifier
    }
}