import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setGroup } from "../store";
import Swal from "sweetalert2";
import { GroupModel } from "../models";
import { toast } from "react-toastify";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useGroupStore = () => {
    const { groups, flag } = useSelector((state: any) => state.groups);
    const dispatch = useDispatch();

    const getGroups = async (page: number, limit: number, search: string) => {
        let filter: any = { params: { page: page } };
        if (limit != -1) filter.params.limit = limit;
        if (search !== '') filter.params.search = search;
        const { data } = await api.get('/auth/groups/', filter);
        dispatch(setGroup({groups: data.groups}));
        return data.total;

    }

    return{ 
        groups,
        flag,

        getGroups
    };
}