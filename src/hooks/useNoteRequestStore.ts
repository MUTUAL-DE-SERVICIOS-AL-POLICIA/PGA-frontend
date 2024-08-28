import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services"
import { refreshNoteRequest, setNoteRequest } from "../store";
import Swal from "sweetalert2";
import { printDocument } from "../utils/helper";

const api = coffeApi;
export const useNoteRequestStore = () => {
    const { note_requests = [], flag } = useSelector((state: any) => state.note_requests);
    const dispatch = useDispatch();

    const getNoteRequest = async (page: number, limit: number, search: string, state: string) => {
        let filter: any = { params: { page: page, limit: limit } };
        if (search !== '') filter.params.search = search;
        if (state !== '') filter.params.state = state;
        const { data } = await api.get('/auth/noteRequest/', filter);
        dispatch(setNoteRequest({ note_requests: data.data }));
        return data.total;
    };

    const postNoteRequest = async (body: object) => {
        try {
            const response = await api.post('/auth/delivered_material/', body);
            if (response.data.status) {
                dispatch(refreshNoteRequest());
                Swal.fire('Estado de la Solicitud', response.data.message, 'success');
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
            return true;
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            Swal.fire('Error', 'Ocurrió un error al procesar la solicitud', 'error');
            return false;
        }
    };

    const PrintNoteRequest = async (note_request: any) => {
        try {
            const response = await api.get(`/auth/print_post_request/${note_request.id_note}/`, {
                responseType: 'arraybuffer', 
            });
            printDocument(response)
            return true

        } catch (error) {
            console.error('Error al imprimir la nota de entrada:', error);
        }
    };


    return {
        note_requests,
        flag,

        getNoteRequest,
        postNoteRequest,
        PrintNoteRequest
    }

}