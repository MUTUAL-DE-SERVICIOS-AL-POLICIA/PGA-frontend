import { Home, Bento, Group, Checklist, NoteAdd, NoteAlt } from "@mui/icons-material"

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
            icon: <Group />,
            //permission: "show-rates"
        },
        {
            path: "/classifierView",
            title: "Clasificador",
            icon: <Bento />,
            //permission: "show-rates"
        },
        {
            path: "/materialsView",
            title: "Materiales",
            icon: <Checklist />,
            //permission: "show-halls"
        },
        {
            path: "/entryView",
            title: "Entradas",
            icon: <NoteAdd />,
            //permission: "show-rates"
        },
        {
            path: "/requestView",
            title: "Solicitudes",
            icon: <NoteAlt />,
            //permission: "show-rates"
        },
        // {
        //     path: "/reports",
        //     title: "Reportes",
        //     icon:<Assessment/>
        // }
    ]
}