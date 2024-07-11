import { Stack, SvgIcon } from "@mui/material";
import { ComponentButton } from "../../../components";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export const NoteEntryView = () =>{

    const navigate = useNavigate();
    const handleRederict = () =>{
        navigate('/createNote');
    }

    return(
        <>
            <Stack direction="row" justifyContent="end">
                <ComponentButton
                    text="Nueva Nota de Entrada"
                    startIcon={<SvgIcon fontSize="small"><Add/></SvgIcon>}
                    onClick={handleRederict}
                />
            </Stack>
        </>
    );
}