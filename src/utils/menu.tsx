import { Home,Assessment, Bento, CalendarMonth, Group, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        {
            path: "/dashboardView",
            title: "Inicio",
            icon: <Home />
        },
        {
            path: "/supplierView",
            title: "Proveedores",
            icon: <Group/>,
            //permission: "show-rates"
        },
        {
            path: "/classifierView",
            title: "Clasificador",
            icon: <Bento/>,
            //permission: "show-rates"
        },
        // {
        //     path: "/customersView",
        //     title: "Clientes",
        //     icon: <CalendarMonth />,
        //     //permission: "show-halls"
        // },
        // {
        //     path: "/rentalView",
        //     title: "Alquileres",
        //     icon: <Receipt />,
        //     //permission: "show-rates"
        // },
        // {
        //     path: "/reports",
        //     title: "Reportes",
        //     icon:<Assessment/>
        // }
    ]
}