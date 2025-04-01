import { useEffect, useState } from 'react';
const useValidateLoginData = (loginData) => {
    const [fieldsIsFilled, setFieldsIsFilled] = useState(false);
    useEffect(() => {
        const isValidLogin = loginData.login.trim().length >= 8 && !loginData.login.includes(' ');
        const isValidPassword = loginData.password.trim().length >= 8 && !loginData.password.includes(' ');
        setFieldsIsFilled(isValidLogin && isValidPassword);
    }, [loginData.login, loginData.password]);
    return fieldsIsFilled;
};
export default useValidateLoginData;
