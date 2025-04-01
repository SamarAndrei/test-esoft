import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const useCheckAuth = () => {
    const store = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (store.validToken) {
            dispatch(checkAuth());
        }
        else {
            navigate('/');
        }
    }, []);
    return store;
};
export default useCheckAuth;
