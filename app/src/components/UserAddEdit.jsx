import React from "react";
import ReactDOM from "react-dom";
import {Button, CircularProgress, Dialog, TextField} from "@material-ui/core";
import API from "../API";
import {Alert} from "@material-ui/lab";
import {Edit} from "@material-ui/icons";

export default function UserAddEdit( { id, name, first, last } )
{
    const refButton                                 = React.useRef();
    const refCancel                                 = React.useRef();
    const refClose                                  = React.useRef();
    const refMsg                                    = React.useRef();
    const [open, setOpen]                           = React.useState(false);
    const [userName, setUserName ]                  = React.useState('');
    const [firstName, setFirstName ]                = React.useState('');
    const [lastName, setLastName ]                  = React.useState('');
    const [errorUserName, setErrorUserName]         = React.useState('');
    const [errorFirstName, setErrorFirstName]       = React.useState('');
    const [errorLastName, setErrorLastName]         = React.useState('');
    React.useEffect( () => {
        if ( id )
        {
            setUserName( name );
            setFirstName( first );
            setLastName( last );
        }
    }, [] );
    const validateUserName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorUserName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 11 )
        {
            setErrorUserName( 'Less or equal 11 to symbols' );
            return false;
        }
        else
        {
            setErrorUserName( '' );
            return true
        }
    }
    const validateFirstName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorFirstName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 11 )
        {
            setErrorFirstName( 'Less or equal 11 to symbols' );
            return false;
        }
        else
        {
            setErrorFirstName( '' );
            return true
        }
    }
    const validateLastName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorLastName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 11 )
        {
            setErrorLastName( 'Less or equal 11 to symbols' );
            return false;
        }
        else
        {
            setErrorLastName( '' );
            return true
        }
    }
    return <span>
        { id ?
            <Edit style={{cursor:'pointer'}} onClick={ ()=>{ setOpen( true ); } } /> :
            <Button variant="contained" color="primary" onClick={()=>{ setOpen( true ); }}>Add New User</Button>
        }
        <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    { id ? 'Edit user' : 'Add new user' }
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <TextField label='User Name'
                                           helperText={ errorUserName }
                                           error={ errorUserName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setUserName( value );
                                               validateUserName( value );
                                           } }
                                           required
                                           autoComplete="off"
                                           defaultValue={ name ? name : '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField label='First Name'
                                           helperText={ errorFirstName }
                                           error={ errorFirstName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setFirstName( value );
                                               validateFirstName( value );
                                           } }
                                           required
                                           autoComplete="off"
                                           defaultValue={ first ? first : '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField label='Last Name'
                                           helperText={ errorLastName }
                                           error={ errorLastName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setLastName( value );
                                               validateLastName( value );
                                           } }
                                           required
                                           autoComplete="off"
                                           defaultValue={ last ? last : '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button ref={refButton} variant="contained" color="primary" onClick={ async () => {
                                    const valid = validateUserName( userName ) && validateFirstName( firstName ) && validateLastName( lastName );
                                    if ( !valid )
                                    {
                                        ReactDOM.render(
                                            <Alert severity="error">Fill all required values</Alert>
                                            ,refMsg.current );
                                        return;
                                    }
                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = 'none';
                                    ReactDOM.render(
                                        <Alert severity="info"><CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...</Alert>
                                        ,refMsg.current );

                                    let jSonResponse;
                                    if ( id )
                                        jSonResponse = await API.update_User( id, userName, firstName, lastName );
                                    else
                                        jSonResponse = await API.add_User( userName, firstName, lastName );

                                    if ( jSonResponse.hasOwnProperty('error') )
                                    {
                                        refButton.current.style.display = '';
                                        refCancel.current.style.display = '';
                                        refClose.current.style.display = 'none';
                                        ReactDOM.render(
                                            <Alert severity="error">{jSonResponse.error}</Alert>
                                            ,refMsg.current );
                                        return;
                                    }

                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = '';
                                    ReactDOM.render(
                                        <Alert severity="success">Use was successfully {id?'updated':'added'}</Alert>
                                        ,refMsg.current );

                                }}>{ id ? 'Edit User' : 'Add User' }</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button ref={refCancel} variant="contained" color="primary" onClick={ () => { setOpen(false ); } }>Cancel</Button>
                                <Button ref={refClose} style={{display:'none'}} variant="contained" color="primary" onClick={ () => { window.location = id ? `/users/user?id=${id}` : `/users` } }>Close</Button>
                                <div ref={refMsg}></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
    </span>;
}
