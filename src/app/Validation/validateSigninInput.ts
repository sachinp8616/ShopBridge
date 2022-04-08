import isEmpty from "./is-empty";
import validator from "validator";

const validateSigninInput = (data: any) => {
    const errors: any = {};

    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if(!validator.isEmail(data.email)){
        errors.email = "Email must be a valid email.";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required.";
    }

    if(!validator.isLength(data.password, {min: 6, max: 15})){
        errors.password = "Password must have min 6 & max 15 characters."
    }

    if(!validator.matches(data.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/)){
        errors.password = 'Password must have at least one Special char, number, small letter, caps letter.'
    }

    return{
        isInvalid: !isEmpty(errors),
        errors: errors
    }
}

export default validateSigninInput;