import { UserActionTypes,UserActions,UserState} from "../../../types/StateAndActionsTypes"; 

const initialState:UserState={
    user:{},
    loading:false,
    error:null,
    isAuth:false,
    message:null,
    allUsers:[],
};

export const UserReducer = (state=initialState,action:UserActions):UserState=>{
    console.log("UserReducer=>",action);
    switch(action.type)
    {
        case UserActionTypes.REQUEST_ACTION:
            return {...state,loading:true};
        case UserActionTypes.FORGET_PASSWORD_ACTION_SUCCESS:
            return {...state,loading:false,message:action.payload.message};
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return{
                ...state,
                isAuth:true,
                loading:false,
                error:null,
                user:action.payload.decodedToken,
                message:action.payload.message,
            }
        case UserActionTypes.REGISTER_USER_SUCCESS:
            return {...state,loading:false,message:action.payload.message};
            case UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS:
            return {...state,loading:false,message:action.payload.message};
        case UserActionTypes.CHANGE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload.message,
                user:action.payload.decodedToken,
                error:null,
            };
        case UserActionTypes.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                message: action.payload.message,
                allUsers: action.payload.payload
            };
        case UserActionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload.message
            };
        case UserActionTypes.REQUEST_ACTION_ERROR:
            return{...state,loading:false,error: action.payload};
        case UserActionTypes.LOG_OUT_USER:
            return{...state,user:null,loading:false,isAuth:false,error:null,message:null}
        case UserActionTypes.LOGIN_OUT:
            return{...state,user:null,loading:false,isAuth:false,error:null,message:null,}
        default:
            return state;
    }
};