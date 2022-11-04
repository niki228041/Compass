import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import avatar from "./avatar-1.jpg";
import Typography from '@mui/material/Typography';
import {useTypedSelector} from "../../../hooks/useTypedSelector"
import {Copyright} from "./copyright"
import { blueGrey } from '@mui/material/colors';
import Button from '@mui/material/Button'
import { useState } from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';
import { useActions } from '../../../hooks/UseActions';
import { style } from '@mui/system';


const secondary_color = blueGrey[500]; 

export const Profile : React.FC = () => {

    const { user } = useTypedSelector((state)=>state.UserReducer);
    const {ChangeUser,ChangePassword} = useActions();
    const [changeInfos, ChangeInfos] = useState(false);

    console.log(user);

    const changeTheChangeInfos=()=>
    {
      ChangeInfos(!changeInfos);
    }

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>
    {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      changeTheChangeInfos();
      console.log("confirmed");

      let Email = data.get('email')?.toString();
      let Username = data.get('username')?.toString();
      let Name = data.get('name')?.toString();
      let Surname = data.get('surname')?.toString();
      let Id = user.Id;

      console.log(user);

      const userToChange={
        id:Id,
        username:Username,
        name:Name,
        surname:Surname,
        email:Email,
      }

      ChangeUser(userToChange);
    }

    const handleSubmitChangePassword=(event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      let oldPassword = data.get('oldpassword')?.toString();
      let newPassword = data.get('newpassword')?.toString();
      let Email = user.Email;

      const passwordToChange={
        Email:Email,
        OldPassword:oldPassword,
        NewPassword:newPassword,
      }

      ChangePassword(passwordToChange);
    }

    return (<>
      <Toolbar/>
            <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }} >
              <Grid container spacing={3} >
              
                {/* Chart */}
                <Grid item xs={12} lg={7}
                >
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    style={{height:"100%"}}>

                    <Grid container spacing={2}>
                      <Grid item xs={8} className="div_avatar_profile">
                        <img src={avatar} className="avatar_profile"></img>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid item xs={4} style={{marginTop:"60px"}}>
                            <Typography variant="h2">Hello</Typography>
                            <Typography variant="h3" sx={{ mt: 4, mb: 4 }}>{user.Name}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>


                    
                  </Paper>
                </Grid>
  
                {/* Recent Deposits */}
                <Grid item xs={12} lg={5} >
                  <Paper
                    className="info_profile"
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }
                    
                    }
                    
                    >
                    <Typography className='font_9 bold'>My Profile</Typography>
                    <Grid component="form" onSubmit={handleSubmit} sx={{pt:1}}>
                        <Typography className='font_1 socondary-color'>Username</Typography>
                        {changeInfos 
                        ? <>
                          <Typography className='font_4'>  {user.Username}</Typography></>
                        : <TextField className='TextFieldWidth' size="small" margin="normal" id="username" label="username" name="username" autoComplete="username"></TextField>}

                        {changeInfos 
                        ?
                        <Grid
                            sx={{
                            display: 'flex',
                            flexDirection: 'row',}}>
                            <Grid >
                              <Typography className='font_1 socondary-color'>Name</Typography>
                              <Typography className='font_4' >{user.Name}    </Typography>
                            </Grid>

                            <Grid sx={{pl:20}}>
                              <Typography className='font_1 socondary-color'>Surname</Typography>
                              <Typography className='font_4' >{user.Surname} </Typography>
                            </Grid>
                        </Grid>
                        : 
                        <>
                          <Typography className='font_1 socondary-color'>Name</Typography>
                          <TextField className='TextFieldWidth' size="small" margin="normal" id="name" label="name" name="name" autoComplete="name" type="name"></TextField>
                          <Typography className='font_1 socondary-color'>Surname</Typography>
                          <TextField className='TextFieldWidth' size="small" margin="normal" id="surname" label="surname" name="surname" autoComplete="surname" type="surname"></TextField>
                        </>}
                      
                        <Typography className='font_1 socondary-color'>Email</Typography>
                        {changeInfos 
                        ? <>
                          <Typography className='font_4' >{user.Email}</Typography>
                          <Button variant="contained" style={{marginTop:10}} className='font_1 change-button' onClick={changeTheChangeInfos}>Change Profile</Button></>
                        : <>
                            <TextField className='TextFieldWidth' size="small" margin="normal" id="email" label="email" name="email" autoComplete="email" type="Email"></TextField> <br/>
                            <Button variant="contained" style={{marginTop:10}} className='font_1 back-button' onClick={changeTheChangeInfos}>Back</Button>
                            <Button variant="contained" style={{marginTop:10,marginLeft:40}} className='font_1 confirm-button' type="submit">Confirm</Button>
                          </>}
                    </Grid>
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper component="form" onSubmit={handleSubmitChangePassword} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography className='font_9 bold' >Change Password</Typography>
                    <TextField className='TextFieldWidth' size="small" margin="normal" id="oldpassword" label="Old password" name="oldpassword" autoComplete="oldpassword"></TextField> <br/>
                    <TextField className='TextFieldWidth' size="small" id="newpassword" label="newpassword" name="newpassword" autoComplete="newpassword"></TextField> <br/>
                    <Button type="submit">Change Password</Button>
                  </Paper>
                </Grid>
              </Grid>
  
              <Copyright sx={{ pt: 4 }} />
  
            </Container>
  
      </>)
}
