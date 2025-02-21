import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services"
import { refreshNoteRequest, setNoteRequest, setNoteRequestPettyCash } from "../store";
import Swal from "sweetalert2";
import { printDocument } from "../utils/helper";

const api = coffeApi;
export const useNoteRequestStore = () => {
    const { note_requests = [], note_requests_petty_cashs = [], flag } = useSelector((state: any) => state.note_requests);
    const dispatch = useDispatch();

    const getNoteRequest = async (page: number, limit: number, search: string, state: string) => {
        let filter: any = { params: { page: page, limit: limit } };
        if (search !== '') filter.params.search = search;
        if (state !== '') filter.params.state = state;
        const { data } = await api.get('/auth/noteRequest/', filter);
        dispatch(setNoteRequest({ note_requests: data.data }));
        return data.total;
    };

    const getNoteRequestPettyCash = async (page: number, limit: number, search: string, state: string) => {
        let filter: any = { params: { page: page, limit: limit } };
        if (search !== '') filter.params.search = search;
        if (state !== '') filter.params.state = state;
        const { data } = await api.get('/auth/noteRequestPettyCash/', filter);
        dispatch(setNoteRequestPettyCash({ note_requests_petty_cashs: data.data }));
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
            return response.data.note;
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            Swal.fire('Error', 'Ocurrió un error al procesar la solicitud', 'error');
            return false;
        }
    };

    const PrintNoteRequest = async (note_request: any) => {
        try {
            const noteId = note_request.id_note || note_request.id;
            const response = await api.get(`/auth/print_post_request/${noteId}/`, {
                responseType: 'arraybuffer',
            });
            printDocument(response)
            return true

        } catch (error) {
            console.error('Error al imprimir la nota de entrada:', error);
        }
    };

    const PrintNoteRequestDelivery = async (note_request: any) => {
        try {
            const response = await api.get(`/auth/printRequest/${note_request.id_note}/`, {
                responseType: 'arraybuffer',
            });
            printDocument(response)
            return true

        } catch (error) {
            console.error('Error al imprimir la nota de entrada:', error);
        }
    };

    const Arreglar = async () => {
        const response = await api.get('/auth/Arreglar/');
        return response;
    }


    return {
        note_requests,
        note_requests_petty_cashs,
        flag,
        getNoteRequestPettyCash,
        getNoteRequest,
        postNoteRequest,
        PrintNoteRequest,
        PrintNoteRequestDelivery,
        Arreglar
    }

}