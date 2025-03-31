import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store.ts";

const useCheckAuth = () => {
    const store = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (store!.validToken){
            dispatch(checkAuth());
        } else {
            navigate('/');
        }
    }, []);

    return store;
};

export default useCheckAuth;
