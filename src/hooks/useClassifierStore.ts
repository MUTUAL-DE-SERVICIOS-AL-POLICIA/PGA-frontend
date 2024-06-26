import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setClassifier, refreshClassifier } from "../store";
import { ClassifierModel } from "../models";
import Swal from "sweetalert2";

const api = coffeApi;

export const useClassifierStore = () => {
    const { classifiers } = useSelector((state: any) => state.classifiers);
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


    const postCreateClassifier = async (body:object)=>{
        try {
            console.log(body);
            await api.post('/auth/classifiers/', body);
            dispatch(refreshClassifier());
            Swal.fire('Clasificador creado correctamente !', '', 'success');
            return true;
        } catch (error) {
            
        }
    }
    return {
        classifiers,

        getClassifier,
        postCreateClassifier
    }
}