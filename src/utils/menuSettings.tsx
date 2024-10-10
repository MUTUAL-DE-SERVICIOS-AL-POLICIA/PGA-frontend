import { AutoStories, Person } from "@mui/icons-material"

export const menuSettings = () => {
    return [
        {
            title: "Reportes",
            //permission: "show-rent",
            group: [
                {
                    path: "/reportExistence",
                    title: "Kardex de Existencia",
                    icon: <AutoStories />,
                    //permission: "show-halls"
                },
                {
                    path: "/reportValuedPhysical",
                    title: "Inv. Fisico Valorado",
                    icon: <AutoStories />,
                    //permission: "show-halls"
                }, {
                    path: "/reportValuedPhysicalConsolided",
                    title: "Inv. Fisico Valorado Consolidado",
                    icon: <AutoStories />,
                    //permission: "show-halls"
                },
            ]
        },
        {
            title: "Gestión de Usuarios",
            //permission: "show-rent",
            group: [
                {
                    path: "/usersView",
                    title: "Usuarios",
                    icon: <Person />,
                    //permission: "show-users"
                },
            ]
        },
    ]
}