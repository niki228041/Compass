import * as Yup from "yup"

const passwordRegExp = /^(?=.)/;

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("This field is required")
        .label("Email adress"),
    
    password: Yup.string()
        .min(6)
        .required("This field is required")
        .matches(passwordRegExp, "Password is not valid")
        .label("Password"),

})

export const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("This field is required")
        .label("Email adress"),

})

export const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("This field is required")
        .label("Email adress"),
    
    password: Yup.string()
        .min(6)
        .required("This field is required")
        .matches(passwordRegExp, "Password is not valid")
        .label("Password"),

    confirmPassword: Yup.string()
        .required("This field is required")
        .matches(passwordRegExp, "Password is not valid")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label("ConfirmPassword"),

    username: Yup.string()
        .required("This field is required")
        .min(2)
        .notOneOf([Yup.ref('userName'), null], 'The Username is already in use')
        .label("UserName"),

    name: Yup.string()
    .required("This field is required")
    .min(1)
    .label("Name"),

    surname: Yup.string()
    .required("This field is required")
    .min(1)
    .label("Surname"),
})
