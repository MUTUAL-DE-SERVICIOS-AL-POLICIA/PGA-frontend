import { Home, Bento, Group, Checklist, NoteAdd, NoteAlt, Notes } from "@mui/icons-material";

const getPermissionsFromStorage = () => {
    let permissions: string[] = [];

    try {
        const storedPermissions = localStorage.getItem('permission');

        if (storedPermissions) {
            permissions = storedPermissions.split(',');
        }
    } catch (error) {
        console.error("Error processing permissions from localStorage:", error);
        permissions = [];
    }

    return permissions;
};

const hasPermission = (userPermissions: string[], requiredPermissions?: string | string[]) => {
    if (!requiredPermissions) return true;
    if (typeof requiredPermissions === 'string') {
        return userPermissions.includes(requiredPermissions);
    }
    return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const menu = () => {
    const permissions = getPermissionsFromStorage();

    return [
        {
            path: "/dashboardView",
            title: "Inicio",
            icon: <Home />,
            requiredPermission: undefined,
        },
        {
            path: "/supplierView",
            title: "Proveedores",
            icon: <Group />,
            requiredPermission: "create-employee",
        },
        {
            path: "/classifierView",
            title: "Clasificador",
            icon: <Bento />,
            requiredPermission: ["create-employee", "read-supplies", "create-material", "edit-material"],
        },
        {
            path: "/materialsView",
            title: "Materiales",
            icon: <Checklist />,
            requiredPermission: ["create-employee", "create-material", "edit-material", "delete-material"],
        },
        {
            path: "/entryView",
            title: "Entradas",
            icon: <NoteAdd />,
            requiredPermission: ["create-employee", "read-supply-requests"],
        },
        {
            path: "/entryNoteRecived",
            title: "Revision Nota",
            icon: <Notes />,
            requiredPermission: "create-employee",
        },
        {
            path: "/requestView",
            title: "Solicitudes",
            icon: <NoteAlt />,
            requiredPermission: "create-employee",
        },
        {
            path: "/requestViewPettyCash",
            title: "Caja Chica",
            icon: <Notes />,
            requiredPermission: ["create-employee", "read-supply-requests"],
        },
    ].filter(item => {
        return hasPermission(permissions, item.requiredPermission);
    });
};
