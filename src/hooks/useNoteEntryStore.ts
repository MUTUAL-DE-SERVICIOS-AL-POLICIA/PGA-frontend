import { useDispatch, useSelector } from "react-redux"
import { setShoppingCart } from "../store";

export const useNoteEntryStore = () => {
    const { note_entries = [], flag, shoppingCart = [] } = useSelector((state: any) => state.note_entries);
    const dispatch = useDispatch();


    const setUpdateShoppingCart = async (items: any) => {
        dispatch(setShoppingCart({ shoppingCart: items }))
    }

    return {
        note_entries,
        flag,
        shoppingCart,

        setUpdateShoppingCart,
    }
}