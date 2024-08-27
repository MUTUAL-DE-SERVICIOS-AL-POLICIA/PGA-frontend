import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services"
import { setReportKardex, setReportValued } from "../store";
import { printDocument, downloadDocument } from "../utils/helper";

const api = coffeApi;

export const useReportKardexStore = () => {
    const { report_ValuedPhys, report_kardexs = [], flag } = useSelector((state: any) => state.report_kardexs);
    const dispatch = useDispatch();

    const getReportKardex = async (material_id: any) => {
        const { data } = await api.get(`/auth/ReportPrintKardex/${material_id}/`);
        dispatch(setReportKardex({ report_kardexs: data }))
        return true;
    }

    const PrintReportKardex = async (material_id: any) => {
        try {
            const response = await api.get(`/auth/PrintKardex/${material_id}/`, {
                responseType: 'arraybuffer',
            });
            printDocument(response)
            return true

        } catch (error) {
            console.error('Error al imprimir la nota de entrada:', error);
        }
    };
    const DownloadReportKardex = async (material_id: any) => {
        try {
            const response = await api.get(`/auth/PrintKardex/${material_id}/`, {
                responseType: 'arraybuffer',
            });
            downloadDocument(response, `report_kardex_${material_id}.pdf`);
            return true;
        } catch (error) {
            console.error('Error al descargar el kardex:', error);
        }
    };
    const getReportValued = async (startDate?: string, endDate?: string) => {
        const params = {
            startDate,
            endDate,
        };
        const { data } = await api.get('/auth/ReportPrintValuedPhysical/', { params });
        dispatch(setReportValued({ report_ValuedPhys: data }));
        return true;
    };

    const PrintReportValued = async (endDate?: string) => {
        const params = {
            endDate,
        };

        try {
            const response = await api.get('/auth/PrintValuedPhysical/', {
                params,
                responseType: 'arraybuffer',
            });
            printDocument(response);

            return true;
        } catch (error) {
            console.error('Error al imprimir el informe:', error);
            return false;
        }
    };


    return {
        report_kardexs,
        flag,
        report_ValuedPhys,

        getReportKardex,
        getReportValued,
        PrintReportKardex,
        DownloadReportKardex,
        PrintReportValued,
    }
}