import axios from "axios";
import IUser from "../types/TypeUser"

axios.defaults.baseURL = "https://localhost:5001/api/User";
axios.defaults.withCredentials = true;

const responseBody: any = (response: any) => response.data;

function delay(time:number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const requests = {
  get: (url: string) => axios.get(url,{timeout:5000}).then(responseBody),

  post: (url: string, body?: any) =>
    axios.post(url, body).then(responseBody),

  put: (url: string, body?: string) =>
    axios.put(url, body).then(responseBody),
  patch: (url: string, body: string) =>
    axios.patch(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const User = {
  login: (user: any) => requests.post(`/login`, user),
  getAllUsers: () => requests.get(`/AllUsers`),
  forgetPassword:(email:any)=> requests.post(`/ForgotPassword`,email),
  register:(user:any) =>requests.post(`/register`,user),
  changeUser:(user:any) =>requests.post(`/ChangeUser`,user),
  changePassword:(passwords:any) =>requests.post(`/ChangePassword`,passwords),
  deleteUser:(id:any) =>requests.post('/DeleteUser',id),
};

export async function login(user: any) {
  console.log(user);
  await delay(500);
  const data = await User.login(user)
    .then((responce) => {
      console.log(`responce at service ${responce}`);
      return {
        responce,
      };
    })
    .catch((error) => {
      console.log(`error at service ${error}}`);
      return error.response;
    });
  return data;
}

export async function forgetPassword(email:any) {
  console.log(`api serves : ${email.email}`);
  await delay(500);

  const data = await User.forgetPassword(email)
  .then((responce)=>{
    console.log(`responce at service ${responce}`)
    return {
      responce,
    };
  }) 
  .catch((error)=>{
    console.log(`error at service ${error}`)
    return error.response;
  }) 
  return data;
}

export async function register(user:any)
{
  console.log(`api register : `);
  console.log(user);
  const data = await User.register(user)
  .then((responce)=>{
    console.log(`responce at service ${responce}`)
    return {
      responce,
    };
  }) 
  .catch((error)=>{
    console.log(`error at service ${error}`)
    return error.response;
  }) 
  return data;
}

export async function changeUser(user:any)
{
  console.log(`api changeUser : `);
  console.log(user);
  const data = await User.changeUser(user)
  .then((responce)=>{
    console.log(`responce at service ${responce}`)
    return {
      responce,
    };
  }) 
  .catch((error)=>{
    console.log(`error at service ${error}`)
    return error.response;
  }) 
  return data;
}


export async function changePassword(passwords:any)
{
  console.log(passwords);
  const data = await User.changePassword(passwords)
  .then((responce)=>{
    console.log(`responce at service ${responce}`)
    return {
      responce,
    };
  }) 
  .catch((error)=>{
    console.log(`error at service ${error}`)
    return error.response;
  }) 
  return data;
}

export function SetAccessToken(token:string)
{
  window.localStorage.setItem("accessToken",token);
}

export function SetRefreshToken(token:string)
{
  window.localStorage.setItem("refreshToken",token);
}

export function SetAllUsers(users:string)
{
  window.localStorage.setItem("allUsers",users);
}



export function GetAccessToken()
{
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}


export function GetRefreshToken()
{
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function RemoveTokens()
{
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}


export async function getAllUsersFromServer() {
  const data = await User.getAllUsers()
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function deleteUser(id:any) {
  const data = await User.deleteUser(id)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}