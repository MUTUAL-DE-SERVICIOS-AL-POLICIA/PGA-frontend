import { useDispatch, useSelector } from "react-redux"
import { setShoppingCart, setNoteEntry } from "../store";
import { coffeApi } from "../services";

const api = coffeApi;

export const useNoteEntryStore = () => {
    const { note_entries = [], flag, shoppingCart = [] } = useSelector((state: any) => state.note_entries);
    const dispatch = useDispatch();


    const setUpdateShoppingCart = async (items: any) => {
        dispatch(setShoppingCart({ shoppingCart: items }))
    }

    const getNoteEntry = async (page: number, limit: number, search: string) => {
        let filter: any = { params: { page: page } };
        if(limit != -1) filter.params.limit = limit;
        if(search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/notes/', filter);
        dispatch(setNoteEntry({note_entries: data.note_entries}))
        return data.total;

    }


    const postNoteEntry = async (body: object) => {
        console.log(body)

        await api.post('/auth/createNoteEntry/', body);

    }

    return {
        note_entries,
        flag,
        shoppingCart,

        setUpdateShoppingCart,
        postNoteEntry,
        getNoteEntry,
    }
}