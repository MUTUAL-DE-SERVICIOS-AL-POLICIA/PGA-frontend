import { coffeApi } from "../services"
import { setUserRequest, setUserUnique } from "../store";
import { useDispatch, useSelector } from "react-redux"



const api = coffeApi;

export const useUserRequestStore = () => {
    const { user_requests = [], flag, user_uniques = [] } = useSelector((state: any) => state.user_requests);

    const dispatch = useDispatch();


    const getUserRequest = async () => {
        const data = await api.get('/auth/listEmployeesRequest');
        dispatch(setUserRequest({ user_requests: data.data }))
        return data;
    }

    const getRequests = async (user_request: any) => {
        console.log(user_request)

        const { data } = await api.get(`/auth/listEmployees/${user_request}`);
        dispatch(setUserUnique({ user_uniques: data }));
        return data;
    }

    return {
        user_requests,
        user_uniques,
        flag,

        getUserRequest,
        getRequests,
    }

}