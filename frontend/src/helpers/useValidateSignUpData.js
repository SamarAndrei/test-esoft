import { useEffect, useState } from 'react';
import validator from "validator";
const useValidateSignUpData = (signUpData) => {
    const [fieldsIsFilled, setFieldsIsFilled] = useState(false);
    useEffect(() => {
        const isValidLogin = signUpData.login.trim().length >= 8 && !signUpData.login.includes(' ');
        const isValidPassword = signUpData.password.trim().length >= 8 && !signUpData.password.includes(' ');
        const isValidFirstName = !validator.isEmpty(signUpData.firstName) && !signUpData.firstName.includes(' ');
        const isValidLastName = !validator.isEmpty(signUpData.lastName) && !signUpData.lastName.includes(' ');
        const isValidMiddleName = signUpData.middleName ? signUpData.middleName.trim().length > 0 && !signUpData.middleName.includes(" ") : true;
        setFieldsIsFilled(isValidLogin && isValidPassword && isValidFirstName && isValidLastName && isValidMiddleName);
    }, [signUpData.firstName, signUpData.lastName, signUpData.login, signUpData.password, signUpData.middleName]);
    return fieldsIsFilled;
};
export default useValidateSignUpData;
