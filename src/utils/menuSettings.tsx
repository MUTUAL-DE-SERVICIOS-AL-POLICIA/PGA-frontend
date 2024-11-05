import { AutoStories, Person } from "@mui/icons-material"

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


export const menuSettings = () => {
    const permissions = getPermissionsFromStorage();
    return [
        {
            title: "Reportes",
            //permission: "show-rent",
            group: [
                {
                    path: "/reportExistence",
                    title: "Kardex de Existencia",
                    icon: <AutoStories />,
                    requiredPermission: undefined,
                    //permission: "show-halls"
                },
                {
                    path: "/reportValuedPhysical",
                    title: "Inv. Fisico Valorado",
                    icon: <AutoStories />,
                    requiredPermission: undefined,
                    //permission: "show-halls"
                }, {
                    path: "/reportValuedPhysicalConsolided",
                    title: "Inv. Fisico Valorado Consolidado",
                    icon: <AutoStories />,
                    requiredPermission: undefined,
                    //permission: "show-halls"
                },
            ]
        },
        {
            title: "Gestión de Usuarios",
            requiredPermission: "create-employee",
            //permission: "show-rent",
            group: [
                {
                    path: "/usersView",
                    title: "Usuarios",
                    icon: <Person />,
                    requiredPermission: "create-employee",
                    //permission: "show-users"
                },
            ]
        },
    ].filter(item => {
        return hasPermission(permissions, item.requiredPermission);
    });
}