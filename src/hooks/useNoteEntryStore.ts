import { useDispatch, useSelector } from "react-redux"
import { setShoppingCart, setNoteEntry, refreshNoteEntry } from "../store";
import { coffeApi } from "../services";
import Swal from "sweetalert2";
import { NoteEntryModel } from "../models";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useNoteEntryStore = () => {
    const { note_entries = [], flag, shoppingCart = [] } = useSelector((state: any) => state.note_entries);
    const dispatch = useDispatch();


    const setUpdateShoppingCart = async (items: any) => {
        dispatch(setShoppingCart({ shoppingCart: items }))
    }

    const getNoteEntry = async (page: number, limit: number, search: string) => {
        let filter: any = { params: { page: page } };
        if (limit != -1) filter.params.limit = limit;
        if (search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/notes/', filter);
        dispatch(setNoteEntry({ note_entries: data.data }))
        return data.total;

    }


    const postNoteEntry = async (body: object) => {
        //console.log(body)
        try {
            await api.post('/auth/createNoteEntry/', body);
            dispatch(refreshNoteEntry());
            Swal.fire('Nota de Entrada Creada Correctamente !!! ', '', 'success');
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

    const deleteNoteEntry = async (note_entry: NoteEntryModel) => {
        console.log(note_entry);
        const { dialogDelete } = DialogComponent();
        const state = await dialogDelete(`Se eliminara la nota de entrada ${note_entry.invoice_number}`);
        if (state) {
            await api.delete(`/auth/deleteNoteEntry/${note_entry.id}/`);
            dispatch(refreshNoteEntry());
            Swal.fire('¡Eliminado!', `${note_entry.id} con codigo de autorizacion`, 'success');
        }
    }

    return {
        note_entries,
        flag,
        shoppingCart,

        setUpdateShoppingCart,
        postNoteEntry,
        getNoteEntry,
        deleteNoteEntry,
    }
}