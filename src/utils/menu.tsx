import { Home,Assessment, Bento, CalendarMonth, Group, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        {
            path: "/dashboardView",
            title: "Inicio",
            icon: <Home />
        },
        {
            path: "/rentalCalendarView",
            title: "Calendario",
            icon: <CalendarMonth />,
            //permission: "show-rates"
        },
        {
            path: "/customersView",
            title: "Clientes",
            icon: <Group />,
            //permission: "show-halls"
        },
        {
            path: "/rentalView",
            title: "Alquileres",
            icon: <Receipt />,
            //permission: "show-rates"
        },
        {
            path: "/productsView",
            title: "Productos",
            icon: <Bento />,
            //permission: "show-rates"
        },
        {
            path: "/reports",
            title: "Reportes",
            icon:<Assessment/>
        }
    ]
}