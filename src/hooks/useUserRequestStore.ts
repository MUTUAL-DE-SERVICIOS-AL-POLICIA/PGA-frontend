import { coffeApi } from "../services"
import { setUserRequest, setUserUnique, setDirectory } from "../store";
import { useDispatch, useSelector } from "react-redux"
import { downloadDocument, printDocument } from "../utils/helper";



const api = coffeApi;

export const useUserRequestStore = () => {
    const { user_requests = [], flag, user_uniques = [], directories = [] } = useSelector((state: any) => state.user_requests);

    const dispatch = useDispatch();


    const getUserRequest = async () => {
        const data = await api.get('/auth/listEmployeesRequest');
        dispatch(setUserRequest({ user_requests: data.data }))
        return data;
    }

    const getRequests = async (user_request: any) => {
        const { data } = await api.get(`/auth/listEmployees/${user_request}`);
        dispatch(setUserUnique({ user_uniques: data }));
        return data;
    }

    const getDirectoryRequest = async (directory: any) => {
        const { data } = await api.get(`/auth/listRequestDirections/${directory}`)
        dispatch(setDirectory({ directories: data }));
        return data;
    }

    const PrintRequestUser = async (user_request: any) => {
        try {
            const response = await api.get(`/auth/printListEmployee/${user_request}/`, {
                responseType: 'arraybuffer'
            });
            printDocument(response);
            return true;
        } catch (error) {
            console.error('Error al imprimir la nota ', error);
        }
    }

    const DownloadRequestUser = async (user_request: any) => {
        try {
            const response = await api.get(`/auth/printListEmployee/${user_request}/`, {
                responseType: 'arraybuffer',
            })
            downloadDocument(response, `report_request_user_${user_request}.pdf`);
            return true;
        } catch (error) {
            console.error('Error al descargar la nota: ', error);
        }
    }

    return {
        user_requests,
        user_uniques,
        directories,
        flag,

        getUserRequest,
        getRequests,
        getDirectoryRequest,
        PrintRequestUser,
        DownloadRequestUser,
    }

}