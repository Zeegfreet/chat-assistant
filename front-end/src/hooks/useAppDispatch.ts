import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, type UseDispatch } from "react-redux";


const useAppDispatch: UseDispatch<Dispatch<any>> = useDispatch

export default useAppDispatch