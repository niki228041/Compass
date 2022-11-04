import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate } from "react-router-dom";
import {Formik,Field,ErrorMessage} from "formik"

import { useActions } from '../../../hooks/UseActions';

import {LoginSchema} from "../validation"
import IUser from "../../../types/TypeUser"



import {useTypedSelector} from "../../../hooks/useTypedSelector"
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link  to="#">
          Dashboard
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

const InitialValue = {email: "",password:"",rememberMe:false};

const theme = createTheme();

const Login : React.FC = () => {

    const { LoginUser } = useActions();
    const { loading,isAuth } = useTypedSelector((state)=>state.UserReducer);
    const { error } = useTypedSelector((state)=>state.UserReducer);
    

    // if(loading){
    //     return <h1>AAAAAAAA...</h1>
    // }

    if(isAuth)
    {
        return <Navigate to="/"></Navigate>
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let rememberMe:any = data.get("rememberMe");
        if(rememberMe == null)
        {
            rememberMe = false
        }
        else
        {
            rememberMe = true;
        }
        let em = data.get('email')?.toString();
        let pass = data.get('password')?.toString();

        if(em != undefined && pass != undefined)
        {
            const user:IUser ={
                email: em!,
                password: pass!,
                rememberMe: rememberMe,
            }
            LoginUser(user)
        }

       

        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        //   rememberMe: data.get('rememberMe'),
        // });

    };

    return(     
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                

            <Formik initialValues={InitialValue} validationSchema={LoginSchema} onSubmit={(values)=>console.log(values)}>
                {({errors,touched,isSubmitting,isValid})=>(
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    style={{width:"100%"}}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {loading ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : ""}
                

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 } } 
                    style={{width:"100%"}}
                    >
                    <Field as = {TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    type="email"
                    />
                    
                    {errors.email && touched.email ?(
                        // style={{color:red}}
                        <div style={{color:"red"}}>{errors.email}</div>
                        // <ErrorMessage name="email" component="div" className='errorMessage' />
                    ):null}

                    <Field as = {TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />

                    {errors.password && touched.password ?(
                        <div style={{color:"red"}}>{errors.password}</div>
                        // <ErrorMessage name="password" component="div" className='errorMessage'/>
                    ):null}

                    <FormControlLabel
                    control={<Checkbox color="primary" name='rememberMe' />}
                    label="Remember me"
                    />

                    

                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                    {isSubmitting ? "..." : "Sing In"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgotPassword">
                            Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            )}
                
            </Formik>
                
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
    )
}
export default Login;