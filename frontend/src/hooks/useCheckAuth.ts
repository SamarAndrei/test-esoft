import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import {AppDispatch, RootState} from "../store/store.ts";


const useCheckAuth = () => {
    const store = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            dispatch(checkAuth());
        }
    }, [dispatch, store!.isAuth]);

    return store;
};

export default useCheckAuth;