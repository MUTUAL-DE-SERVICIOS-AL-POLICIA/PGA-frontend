import { coffeApi } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { setDashboard } from "../store";

const api = coffeApi;

export const useDashboardStore = () => {
    const { dashboards, flag } = useSelector((state: any) => state.dashboards);
    const dispatch = useDispatch();

    const getDashboard = async () => {
        const { data } = await api.get('/auth/dataDashboard');
        dispatch(setDashboard({ dashboards: data }))
        return data;
    }

    return {
        dashboards,
        flag,

        getDashboard,
    }
}