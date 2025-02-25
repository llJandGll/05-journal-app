import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";




export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = () => useSelector((state: RootState) => state);
