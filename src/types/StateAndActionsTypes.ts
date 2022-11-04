export interface UserState{
    user:any;
    loading:boolean;
    error:null|string;
    isAuth:boolean;
    message:null|string;
    allUsers:any;
}

export enum UserActionTypes{
    LOGIN_USER = "LOGIN_USER",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
    FORGET_PASSWORD_ACTION = "FORGET_PASSWORD_ACTION",
    FORGET_PASSWORD_ACTION_SUCCESS = "FORGET_PASSWORD_ACTION_SUCCESS",
    FORGET_PASSWORD_ACTION_ERROR = "FORGET_PASSWORD_ACTION_ERROR",
    LOG_OUT_USER = "LOG_OUT_USER",
    REQUEST_ACTION  = "REQUEST_ACTION",
    REQUEST_ACTION_ERROR = "REQUEST_ACTION_ERROR",
    LOGIN_OUT = "LOGIN_OUT",
    REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
    CHANGE_USER_SUCCESS = "CHANGE_USER_SUCCESS",
    GET_ALL_USER_SUCCESS = "GET_ALL_USER_SUCCESS",
    CHANGE_USER_PASSWORD_SUCCESS = "CHANGE_USER_PASSWORD_SUCCESS",
    DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
}

interface RequestAction{
    type:UserActionTypes.REQUEST_ACTION
}

interface RequestActionError{
    type:UserActionTypes.REQUEST_ACTION_ERROR
    payload:any,
}
interface LoginUserAction{
    type:UserActionTypes.LOGIN_USER
}

interface LoginUserSuccessAction{
    type:UserActionTypes.LOGIN_USER_SUCCESS,
    payload:any,
}

interface LoginUserErrorAction{
    type:UserActionTypes.LOGIN_USER_ERROR,
    payload:any,
}

interface LoginOutUserAction{
    type:UserActionTypes.LOG_OUT_USER
}


interface ForgetPasswordAction{
    type:UserActionTypes.FORGET_PASSWORD_ACTION
}

interface ForgetPasswordSuccessAction{
    type:UserActionTypes.FORGET_PASSWORD_ACTION_SUCCESS,
    payload:any,
}

interface ForgetPasswordErrorAction{
    type:UserActionTypes.FORGET_PASSWORD_ACTION_ERROR,
}

interface LogOutAction{
    type:UserActionTypes.LOGIN_OUT,
}

interface RegisterUserSuccess{ 
    type:UserActionTypes.REGISTER_USER_SUCCESS,
    payload:any,
}

interface ChangeUserSuccess{ 
    type:UserActionTypes.CHANGE_USER_SUCCESS,
    payload:any,
}

interface ChangeUserPasswordSuccess{
    type:UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
    payload:any,
}

interface GetAllUsersSuccess{
    type:UserActionTypes.GET_ALL_USER_SUCCESS,
    payload:any,
}

interface DeleteUserSuccess{
    type:UserActionTypes.DELETE_USER_SUCCESS,
    payload:any,
}

export type UserActions = 
 LoginUserAction|LoginUserSuccessAction|LoginUserErrorAction|
 
 ForgetPasswordAction|ForgetPasswordSuccessAction|ForgetPasswordErrorAction|

 LoginOutUserAction|RequestAction|RequestActionError|LogOutAction|RegisterUserSuccess|

 ChangeUserSuccess|ChangeUserPasswordSuccess|GetAllUsersSuccess|DeleteUserSuccess;