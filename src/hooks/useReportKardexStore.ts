import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services"
import { setReportKardex } from "../store";

const api = coffeApi;

export const useReportKardexStore = () => {
    const { report_kardexs = [], flag } = useSelector((state: any) => state.report_kardexs);
    const dispatch = useDispatch();

    const getReportKardex = async (material_id: any) => {
        console.log(material_id);
        const { data } = await api.get(`/auth/ReportPrintKardex/${material_id}/`);
        dispatch(setReportKardex({ report_kardexs: data }))
        return true;
    }

    return {
        report_kardexs,
        flag,

        getReportKardex,
    }
}