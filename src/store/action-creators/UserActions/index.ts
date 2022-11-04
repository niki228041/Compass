import { UserActions,UserActionTypes } from "../../../types/StateAndActionsTypes";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {deleteUser,login,forgetPassword, SetAccessToken,SetRefreshToken,RemoveTokens,getAllUsersFromServer,SetAllUsers,register,changeUser,changePassword} from "../../../services/api-user-service";
import jwtDecode from "jwt-decode";

export const LoginUser = (user:any)=>{
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data = await login(user);
            console.log(data);

            const {responce} = data;
            console.log("LoginUser=>",responce);
            console.log("LoginMessage=>");
            console.log(responce.message);

            if(!responce.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.REQUEST_ACTION_ERROR,
                    payload:responce.message,
                });
                toast.error(responce.message);
            }
            else{
                const {accessToken, refreshToken,message} = responce;

                SetAccessToken(accessToken);
                SetRefreshToken(refreshToken);

                AuthUser(accessToken,message,dispatch);
               
                toast.success(responce.message);
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknown error",
            })
        }
    }
}

export const ForgotPassword=(email:any)=>{
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const requestToServer=await forgetPassword(email);
            console.log(`(результат обробки ахиосом(post))`);

            const {responce} = requestToServer;


            if(responce.isSuccess)
            {
                console.log("Im good")
                dispatch({
                    type:UserActionTypes.FORGET_PASSWORD_ACTION_SUCCESS,
                    payload:responce.message,
                })
                toast.success(responce.message);
            }
            if(responce.isSuccess == false)
            {
                dispatch({
                    type:UserActionTypes.REQUEST_ACTION_ERROR,
                    payload:responce.message,
                });
                toast.error(responce.message);
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknow error",
            })
            toast.error("Unknow error");
        }
    }
}

export const RegisterUser = (user:any)=>{
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data=await register(user);
            console.log(data);

            const {responce} = data;
            console.log("RegisterUser=>",responce);

            if(!responce.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.REQUEST_ACTION_ERROR,
                    payload:responce.message,
                });
                console.log(responce.errors[0]);

                toast.error(responce.errors[0]);
            }
            else{
                dispatch({
                    type:UserActionTypes.REGISTER_USER_SUCCESS,
                    payload:responce.message,
                });
                toast.success(responce.message);
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknown error",
            })
        }
    }
}

export const ChangeUser = (user:any)=>{
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data=await changeUser(user);
            console.log(data);

            const {responce} = data;
            console.log("changeUser=>",responce);

            if(!responce.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.REQUEST_ACTION_ERROR,
                    payload:responce.message,
                });
                console.log(responce.errors[0]);

                toast.error(responce.errors[0]);
            }
            else{
                const {accessToken, refreshToken,message} = responce;

                SetAccessToken(accessToken);
                SetRefreshToken(refreshToken);

                AuthUser(accessToken,message,dispatch);
               
                toast.success(responce.message);
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknown error",
            })
        }
    }
}


export const ChangePassword = (passwords:any)=>{
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data=await changePassword(passwords);
            console.log(data);

            const {responce} = data;
            console.log("changePassword=>",responce);

            if(!responce.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.REQUEST_ACTION_ERROR,
                    payload:responce.message,
                });
                console.log(responce.errors[0]);

                toast.error(responce.errors[0]);
            }
            else{
                dispatch({
                    type:UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
                    payload:responce.message,
                });
                toast.success(responce.message);
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknown error",
            })
        }
    }
}



export const AuthUser = (token:string,message:string,dispatch: Dispatch<UserActions>)=>{
    const decodedToken = jwtDecode(token) as any;

    dispatch({
    type:UserActionTypes.LOGIN_USER_SUCCESS,
    payload: {message,decodedToken},
});
}

export const LogOut = ()=>{
    return async (dispatch: Dispatch<UserActions>)=>{
        RemoveTokens();
        dispatch({
        type:UserActionTypes.LOGIN_OUT,
        });
    }
};

export const GetAllUsersAction = ()=> {
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data = await getAllUsersFromServer();
            const {response} = data;
        
            if(response.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.GET_ALL_USER_SUCCESS,
                    payload:response,
                })
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknow error",
            })
        }
    }
}



export const DeleteUser = (id:any)=> {
    return async (dispatch:Dispatch<UserActions>)=>{
        try{
            dispatch({type:UserActionTypes.REQUEST_ACTION});
            const data = await deleteUser(id);
            
            const {response} = data;

            if(response.isSuccess)
            {
                dispatch({
                    type:UserActionTypes.DELETE_USER_SUCCESS,
                    payload:response,
                })
            }
        }catch(error){
            dispatch({
                type:UserActionTypes.REQUEST_ACTION_ERROR,
                payload:"Unknow error",
            })
        }
    }
}