import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {Formik,Field,ErrorMessage} from "formik"
import {RegisterSchema} from "../../auth/validation"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {Copyright} from "./copyright"

import { useActions } from '../../../hooks/UseActions';
import {useTypedSelector} from "../../../hooks/useTypedSelector"
import Select from '@mui/material/Select';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';




const InitialValue = {email: "",password:"",confirmPassword:"",userType:null,username:"",name:"",surname:""};
const theme = createTheme();


export const CreateUser : React.FC = () => {

    const { RegisterUser } = useActions();
    const { loading} = useTypedSelector((state)=>state.UserReducer);
    const [Role,setRole] = useState("");
   
    const handleChange = (event: { target: { value: string } }) => {
      setRole(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let username = data.get('username')?.toString();
        let name = data.get('name')?.toString();
        let surname = data.get('surname')?.toString();
        let role = Role;
        let email = data.get('email')?.toString();
        let password = data.get('password')?.toString();
        let confirmPass = data.get('confirmPassword')?.toString();
  
        const user ={
          username: username!,
          name: name!,
          email: email!,
          role:role!,
          surname: surname!,
          password: password!,
          confirmPassword: confirmPass,
        }
        console.log(user);
  
        RegisterUser(user);
    };
  
    return(     
      <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
  
  
            <CssBaseline />
                
  
            <Formik initialValues={InitialValue} validationSchema={RegisterSchema} onSubmit={(values)=>console.log(values)}>
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
                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                  <Typography component="h1" variant="h5" style={{marginLeft:"-356px",marginTop:"50px"}} >
                    Create User
                  </Typography>
                  <AddCircleIcon style={{marginLeft:"-150px",marginTop:"49px"}} />
  
                </Grid>
                
  
  
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
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    type="username"
                  />
                    
                  {errors.username && touched.username ?(
                      <div style={{color:"red"}}>{errors.username}</div>
                  ):null}
  
  
                  <Field as = {TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    type="name"
                  />
                    
                  {errors.name && touched.name ?(
                      <div style={{color:"red"}}>{errors.name}</div>
                  ):null}
  
                  <Field as = {TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="surname"
                    label="Surname"
                    name="surname"
                    autoComplete="surname"
                    autoFocus
                    type="surname"
                  />
                    
                  {errors.surname && touched.surname ?(
                      <div style={{color:"red"}}>{errors.surname}</div>
                  ):null}
  
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
  
                  <Field as = {TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="ConfirmPassword"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="current-confirmPassword"
                  />
  
                  {errors.confirmPassword && touched.confirmPassword ?(
                      <div style={{color:"red"}}>{errors.confirmPassword}</div>
                      // <ErrorMessage name="password" component="div" className='errorMessage'/>
                  ):null}

                  <Select
                    id="Role"
                    value={Role}
                    onChange={handleChange}
                  >
                    <MenuItem value={"master"}>master</MenuItem>
                    <MenuItem value={"user"}>user</MenuItem>
                  </Select>
  
                  <Button
                      disabled={!isValid}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      >
                  {isSubmitting ? "..." : "Create"}
                  </Button>
                </Box>
            </Box>
            )}
                
            </Formik>
                
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
  
    )
  }