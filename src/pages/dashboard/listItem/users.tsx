import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useActions } from '../../../hooks/UseActions';
import Button from '@mui/material/Button'
import '../listItem/someCss.css'
import React ,{useEffect} from 'react';
import {Copyright} from "./copyright"
import { useState } from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector"
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import {
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';







    // const allUsers = GetAllUsers()!;
    // const allUsersSpliter_row = allUsers.split('~');
    // console.log(allUsersSpliter_row);
    
    // const singlUser = allUsersSpliter_row.map((user:string)=>{
    //   const allUsersSpliter = user.split('|');
    //   console.log(allUsersSpliter[0]);
    //   if(allUsersSpliter[0] != null)
    //   {  
    //     const real_user = { id: allUsersSpliter[0], Name: allUsersSpliter[1], Surname: allUsersSpliter[2], Email: allUsersSpliter[3] ,UserName: allUsersSpliter[4]}; 
    //     return real_user;
    //   }
    // })



export const Users:React.FC = ()=>{
  const {GetAllUsersAction} = useActions();
  const {DeleteUser} = useActions();

  var {allUsers} = useTypedSelector((state)=>state.UserReducer);

  console.log(allUsers);

  const [rows,setRows] = useState(allUsers);


  async function loadUsers() {
    await GetAllUsersAction();
    await setRows(allUsers);
    console.log("im in button");
    console.log(allUsers);
  }

  const deleteUserHandle = React.useCallback (
    (params:GridRowId) =>() =>{ 


    const user={
      Id:params,
    }

    DeleteUser(user);

    GetAllUsersAction();

    setRows(() => {
      var rowToDeleteIndex = 0;

      for (let index = 0; index < rows.length; index++) {
        if(rows[index].id == params)
        {
          rowToDeleteIndex = index;
        }
      }

      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex+1),
      ];
    });
  },
  [],
  );
  
  // const deleteUserHandle=(id:any)=>{
  //   const {DeleteUser} = useActions();
  //   console.log(id);
  //   const {allUsers} = useTypedSelector((state)=>state.UserReducer);
  
  //   const rows = allUsers;
  
  
  //   // DeleteUser();
  // }

  type Row = typeof rows[number];

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'name', type: 'string' },
      { field: 'surname', type: 'string' },
      { field: 'username', type: 'string', width: 130 },
      { field: 'email', type: 'string', width: 180 },
      { field: 'role', type: 'string', width: 120 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUserHandle(params.id)}
          />,
          // <GridActionsCellItem
          //   icon={<SecurityIcon />}
          //   label="Toggle Admin"
          //   onClick={deleteUserHandle(params.id)}
          //   showInMenu
          // />,
          // <GridActionsCellItem
          //   icon={<FileCopyIcon />}
          //   label="Duplicate User"
          //   onClick={deleteUserHandle(params.id)}
          //   showInMenu
          // />,
        ],
      },
    ],
    [deleteUserHandle],
  );
  






  useEffect(() => {
    GetAllUsersAction();
    setRows(allUsers);
  }, []);

  return (<>
      <Toolbar />
        <Container style={{ height: 400, width: '100%',flexDirection: "column",}} sx={{ mt: 4, mb: 4}}>

        <Grid style={{display: 'flex',flexDirection: 'row'}}>

          <Link  to="/create-user" className='norm-button'>
            <Button style={{width:'150px'}} variant="contained" color="primary" sx={{ mt: 4, mb: 4}}>
              Create User  
            </Button>
          </Link>

          <Button onClick={loadUsers} style={{width:'30%',marginLeft:'70%'}} variant="contained" color="primary" sx={{ mt: 4, mb: 4}}>
              Load Users
          </Button>

        </Grid>
          

          <DataGrid 
            rows={allUsers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            // onRowClick={deleteUserHandle}
          />

          <Copyright sx={{ pt: 4 }} />
          <Outlet/>
        </Container>

  </>)
}


