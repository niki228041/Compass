import React from "react";
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { indigo } from "@mui/material/colors";
import {Formik,Field,ErrorMessage} from "formik"
import {ForgetPasswordSchema} from "../validation"

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/UseActions";
import CircularProgress from '@mui/material/CircularProgress';


const theme = createTheme();



const ForgotPassword : React.FC = () => {

    const { ForgotPassword } = useActions();
    const { loading } = useTypedSelector((state)=>state.UserReducer);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const email_ = email!.toString();
        console.log(`in forgetIndex ${email_}`);
        const email_toSend = {email:email_}
        ForgotPassword(email_toSend)
      };


    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <Avatar sx={{m:1,bgcolor:indigo[500]}}>
                    <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Forget Password
                </Typography>

                {loading ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : ""}

                <Formik initialValues={{email:""}} validationSchema={ForgetPasswordSchema} onSubmit={()=>{}}>
                {({errors,touched})=>(
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}
                style={{width:"100%"}}>
                    <Field as ={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                    Forget Password
                    </Button>
                </Box>
                )}
                </Formik>
                </Box>
        </Container>
    </ThemeProvider>

        
    )
}

export default ForgotPassword;