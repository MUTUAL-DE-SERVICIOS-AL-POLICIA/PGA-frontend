import { useCallback, useEffect, useState } from "react"
import { ClassifierModel } from "../../../models"
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import { useClassifierStore } from "../../../hooks";
import { ItemPaper, SkeletonClassifier } from "../../../components";
import noimage from "../../../assets/images/no-image.webp";
import carpeta from "../../../assets/images/carpeta.png";
import { CreateClassifier } from "./CreateClassifiers";
interface tableProps {
    onEdit?: (classifier: ClassifierModel) => void;
    stateSelect?: boolean;
    //itemSelect?:boolean;  //Recordar para los grupos en un classifier 
    items?: any[];
}
export const ClassifierTable = (props: tableProps) => {
    const { onEdit, stateSelect = false, items, } = props;
    const { flag, classifiers = null, getClassifier } = useClassifierStore();
    const [openDialog, setOpenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<any>(null);
    const [change, setChange] = useState<boolean>(true);

    const handleDialog = useCallback((value: boolean) => {
        setOpenDialog(value);
        if (!value) return setItemEdit(null);
        setChange(value)
    }, []);

    useEffect(()=>{
        getClassifier();
    },[flag]);

    return (
        <>
            {
                classifiers == null ? <SkeletonClassifier /> : classifiers.map((classifier: ClassifierModel) => {
                    return (
                        <ItemPaper key={classifier.id} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={3} sx={{ padding: '5px', textAlign: 'center' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>{classifier.code_class}</Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>{classifier.nombre}</Typography>
                                    <img
                                        src={carpeta}
                                        alt="Descripción de la imagen"
                                        style={{ height: '190px', width: '180px', objectFit: 'cover' }}
                                        onError={(e: any) => e.target.src = noimage}
                                    />
                                    {
                                        !stateSelect &&
                                        <Box sx={{ textAlign: 'center' }} >
                                            <IconButton color="success" onClick={()=>onEdit!(classifier)}>
                                                <Edit/>
                                            </IconButton>
                                            <IconButton color="error">
                                                <Delete/>
                                            </IconButton>
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={9} sx={{padding: '5px'}}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Descripcion</Typography>
                                    <Typography sx={{textAlign: 'justify'}}>{classifier.description}</Typography>
                                    {/*Aca deb ir la tabla de los grupos*/} 
                                </Grid>
                            </Grid>
                        </ItemPaper>
                    )
                })
            }

            {
                openDialog && <CreateClassifier 
                    open={openDialog}
                    handleClose={()=> handleDialog(false)}
                    classifier={itemEdit}
                    change={change}
                ></CreateClassifier>
            }
        </>
    )
}