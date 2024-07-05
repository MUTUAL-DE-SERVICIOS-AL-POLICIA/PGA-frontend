import { useDispatch, useSelector } from "react-redux";
import { coffeApi } from "../services";
import { setGroup, setGroupMaterial, setAllGroup } from "../store";
import Swal from "sweetalert2";
import { GroupModel } from "../models";
import { toast } from "react-toastify";
import { DialogComponent } from "../components";

const api = coffeApi;

export const useGroupStore = () => {
    const { allGroups, allgroupsWithMaterial, flag } = useSelector((state: any) => state.groups);
    const dispatch = useDispatch();


    const getAllGroups = async (page: number, limit: number, search: string | null = null) => {
        try {
            let filter: any = { params: { page: page } };
            if (limit != -1) filter.params.limit = limit;
            if (search !== '') filter.params.search = search;
            const { data } = await api.get('/auth/groups/', filter);
            //console.log(data);
            const groups: any = []
            data.data.forEach((element: any) => { //data se llama donde envio los datos
                const group: any = {}
                group.id = element.id
                group.id_class = element.classifier.code_class
                group.code_group = element.code
                group.name_group = element.name_group
                groups.push(group)
            });
            dispatch(setAllGroup({ allGroups: groups }))
            data.data.forEach((element: any) => {
                let allMaterial: any = []
                element.materials.forEach((material: any) => {
                    let newMaterial: any = []
                    newMaterial.id = material.id
                    newMaterial.unit_material = material.unit_material
                    newMaterial.name_material = material.description
                    newMaterial.stock = material.stock
                    allMaterial.push(newMaterial)
                })
                element.materials = allMaterial
            });
            //console.log(data.data)
            dispatch(setGroupMaterial({allgroupsWithMaterial: data.data}))
            return data.total;
        } catch (error) {

        }

    }

    return {
        allGroups,
        flag,
        allgroupsWithMaterial,

        getAllGroups
    };
}