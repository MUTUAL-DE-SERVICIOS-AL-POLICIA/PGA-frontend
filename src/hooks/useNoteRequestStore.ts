import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services"
import { setNoteRequest } from "../store";

const api = coffeApi;
export const useNoteRequestStore = () => {
    const { note_requests = [], flag } = useSelector((state: any) => state.note_requests);
    const dispatch = useDispatch();

    const getNoteRequest = async (page: number, limit: number, search: string) => {
        let filter: any = { params: { page: page } }
        if (limit != -1) filter.params.limit = limit;
        if (search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/noteRequest/', filter);
        dispatch(setNoteRequest({note_requests: data.data}));
        return data.total;
    }


    return {
        note_requests,
        flag,

        getNoteRequest,
    }

}