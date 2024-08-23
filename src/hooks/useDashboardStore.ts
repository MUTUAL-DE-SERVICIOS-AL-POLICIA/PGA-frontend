import { coffeApi } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { setDashboard, setTableDashboard } from "../store";

const api = coffeApi;

export const useDashboardStore = () => {
    const { table_boards, dashboards, flag } = useSelector((state: any) => state.dashboards);
    const dispatch = useDispatch();

    const getDashboard = async () => {
        const { data } = await api.get('/auth/dataDashboard');
        dispatch(setDashboard({ dashboards: data }))
        return data;
    }

    const getTableDashboard = async () => {
        const { data } = await api.get('/auth/dataTableDashboard');
        dispatch(setTableDashboard({ table_boards: data }));
        return data;
    }



    return {
        dashboards,
        flag,
        table_boards,

        getDashboard,
        getTableDashboard,
    }
}