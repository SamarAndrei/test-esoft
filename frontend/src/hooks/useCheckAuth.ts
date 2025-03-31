import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store.ts";

const useCheckAuth = () => {
    const { isAuth, isLoading, validToken } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (validToken){
            dispatch(checkAuth()).unwrap();
        } else {
            navigate('/');
        }
    }, [dispatch, isAuth, isLoading, validToken]);

    return { isAuth, isLoading };
};

export default useCheckAuth;
