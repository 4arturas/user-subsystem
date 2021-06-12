import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import API from "../API";
import {NavLink} from "react-router-dom";
import CommonTable from "./CommonTable";
import SearchReplace from "./SearchReplace";
import * as GB from "../global";
import {Button, CircularProgress, Dialog, Input, TextField} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

function AddUser()
{
    const [open, setOpen]   = React.useState(false);
    const refButton         = React.useRef();
    const refCancelButton   = React.useRef();
    const refInfo           = React.useRef();
    const refSuccess        = React.useRef();
    const refError          = React.useRef();
    const refErrorMsg       = React.useRef();
    const refWarning        = React.useRef();
    const refWarningMsg     = React.useRef();

    const handleClickOpen = async () =>
    {
        setOpen(true);
    };

    const handleClose = (value) =>
    {
        setOpen(false);
    };


    const addNewUser = async () =>
    {
        refButton.current.style.display             = 'none';
        refCancelButton.current.style.display       = '';
        refSuccess.current.style.display            = 'none';
        refWarning.current.style.display            = 'none';
        refError.current.style.display              = 'none';
        refInfo.current.style.display               = 'none';

        let valid = errorUserName.length === 0 && errorUserPassword.length === 0 && errorFirstName.length === 0 && errorLastName.length === 0;
        valid = valid && userName.length > 0 && userPassword.length > 0 && firstName.length > 0 && lastName.length > 0;

        if ( valid === false )
        {
            refButton.current.style.display         = '';
            refCancelButton.current.style.display   = '';
            refError.current.style.display          = '';
            refErrorMsg.current.innerHTML           = 'Fill all required values';
            return;
        }

        refInfo.current.style.display       = '';

        const jSonResponse = await API.add_NewUser( 1, userName, userPassword, firstName, lastName );
        if ( jSonResponse.hasOwnProperty('warning') )
        {
            refButton.current.style.display             = '';
            refCancelButton.current.style.display       = '';
            refSuccess.current.style.display            = 'none';
            refWarning.current.style.display            = '';
            refError.current.style.display              = 'none';
            refInfo.current.style.display               = 'none';
            refWarningMsg.current.innerHTML             = jSonResponse.warning;
            return;
        }
        if ( jSonResponse.hasOwnProperty('error') )
        {
            refButton.current.style.display             = '';
            refCancelButton.current.style.display       = '';
            refSuccess.current.style.display            = 'none';
            refWarning.current.style.display            = 'none';
            refError.current.style.display              = '';
            refInfo.current.style.display               = 'none';
            refErrorMsg.current.innerHTML               = jSonResponse.error;
            return;
        }
        // TODO: handle errors
        refButton.current.style.display         = 'none';
        refCancelButton.current.style.display   = '';
        refSuccess.current.style.display        = '';
        refWarning.current.style.display        = 'none';
        refError.current.style.display          = 'none';
        refInfo.current.style.display           = 'none';
        refCancelButton.current.innerHTML       = 'Close';
    }

    const [ userName, setUserName ]             = React.useState('');
    const [errorUserName, setErrorUserName]     = React.useState( '' );
    const onChangeUserName = ( event ) =>
    {
        const value = event.target.value;
        setUserName( value );
        if ( value.length === 0 )
            setErrorUserName( 'More than 0 symbols' );
        else if ( value.length > 6 )
            setErrorUserName( 'Less than 6 symbols' );
        else
            setErrorUserName( '' );

    }

    const [ userPassword, setUserPassword ]             = React.useState('');
    const [errorUserPassword, setErrorUserPassword]     = React.useState( '' );
    const onChangeUserPassword = ( event ) =>
    {
        const value = event.target.value;
        setUserPassword( value );
        if ( value.length === 0 )
            setErrorUserPassword( 'More than 0 symbols' );
        else if ( value.length > 3 )
            setErrorUserPassword( 'Less than 3 symbols' );
        else
            setErrorUserPassword( '' );
    }

    const [ firstName, setFirstName ]             = React.useState('');
    const [errorFirstName, setErrorFirstName]     = React.useState( '' );
    const onChangeFirstName = ( event ) =>
    {
        const value = event.target.value;
        setFirstName( value );
        if ( value.length === 0 )
            setErrorFirstName( 'More than 0 symbols' );
        else if ( value.length > 3 )
            setErrorFirstName( 'Less than 3 symbols' );
        else
            setErrorFirstName( '' );
    }

    const [ lastName, setLastName ]             = React.useState('');
    const [errorLastName, setErrorLastName]     = React.useState( '' );
    const onChangeLastName = ( event ) =>
    {
        const value = event.target.value;
        setLastName( value );
        if ( value.length === 0 )
            setErrorLastName( 'More than 0 symbols' );
        else if ( value.length > 3 )
            setErrorLastName( 'Less than 3 symbols' );
        else
            setErrorLastName( '' );
    }

    const textFieldCommonStyles = {width:'400px'};

    return (
        <span>
        <Button variant="contained" color="primary" onClick={() => { handleClickOpen(); }}>
            Add New User
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    Add New User
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <TextField label='User Name'
                                           helperText={ errorUserName }
                                           error={ errorUserName.length > 0 }
                                           onChange={ onChangeUserName  }
                                           required
                                           autoComplete="off" style={ textFieldCommonStyles }/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField label='User Password'
                                           helperText={ errorUserPassword }
                                           error={ errorUserPassword.length > 0 }
                                           onChange={ onChangeUserPassword  }
                                           required
                                           autoComplete="off" style={ textFieldCommonStyles }/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField label='First Name'
                                           helperText={ errorFirstName }
                                           error={ errorFirstName.length > 0 }
                                           onChange={ onChangeFirstName  }
                                           required
                                           autoComplete="off" style={ textFieldCommonStyles }/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField label='Second Name'
                                           helperText={ errorLastName }
                                           error={ errorLastName.length > 0 }
                                           onChange={ onChangeLastName  }
                                           required
                                           autoComplete="off" style={ textFieldCommonStyles }/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button variant="contained" color="primary" ref={refButton} onClick={()=>{ addNewUser(); }}>Add</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="contained" color="primary" ref={refCancelButton} onClick={()=>{ handleClose('novalue'); }}>Cancel</Button>
                                <Alert severity="info" ref={refInfo} style={{display:'none'}}>
                                    <AlertTitle>Info</AlertTitle>
                                    <CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...
                                </Alert>
                                <Alert severity="success" ref={refSuccess} style={{display:'none'}}>
                                    <AlertTitle>Success</AlertTitle>
                                        User is added
                                </Alert>
                                <Alert severity="error" ref={refError} style={{display:'none'}}>
                                    <AlertTitle>Error</AlertTitle>
                                    <div ref={refErrorMsg}></div>
                                </Alert>
                                <Alert severity="warning" ref={refWarning} style={{display:'none'}}>
                                    <AlertTitle>Warning</AlertTitle>
                                    <div ref={refWarningMsg}></div>
                                </Alert>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
        </span>
    );
}

function UserRow( { row, searchValue } )
{
    const user_add_date                                                 = GB.format_Date1(row.user_add_date);

    return (

        <TableRow hidden={true}
                  hover
                  tabIndex={-1}
                  key={row.user_id}
        >
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <NavLink to={"/users/user?id=" + row.user_id}>
                    <SearchReplace value={row.user_name} markValue={searchValue}/>
                </NavLink>
            </TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={row.first_name} markValue={searchValue}/></TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={row.last_name} markValue={searchValue}/></TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={user_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
};

export default function Users()
{
    const headCells = [
        { id: 'user_name', numeric: false, disablePadding: false, label: 'User Name' },
        { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
        { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'user_add_date', numeric: false, disablePadding: false, label: 'User Add Date' },
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async () =>
    {
        const users = await API.get_Users();
        setData( users );
    }, [] );

    return (
        <div>{ !data ?
            <></> :
            <div>
                <div style={{paddingBottom:'5px', textAlign:"center"}}>
                    {/*<AddUser/>*/}
                </div>
                <CommonTable headCells={headCells} data={ data } RowComponent={ UserRow }/>
            </div>
        }
        </div>
    );
}
