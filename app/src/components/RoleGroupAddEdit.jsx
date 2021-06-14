import React from "react";
import ReactDOM from "react-dom";
import {Button, CircularProgress, Dialog, TextField} from "@material-ui/core";
import API from "../API";
import {Alert} from "@material-ui/lab";
import {Edit} from "@material-ui/icons";

export default function RoleGroupAddEdit( { id, name } )
{
    const refButton                                     = React.useRef();
    const refCancel                                     = React.useRef();
    const refClose                                      = React.useRef();
    const refMsg                                        = React.useRef();
    const [open, setOpen]                               = React.useState(false);
    const [roleGroupName, setRoleGroupName ]            = React.useState('');
    const [errorRoleGroupName, setErrorRoleGroupName]   = React.useState('');
    React.useEffect( () => {
        if ( id )
            setRoleGroupName( name );
    }, [] );
    const validateRoleGroupName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorRoleGroupName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 11 )
        {
            setErrorRoleGroupName( 'Less or equal 11 to symbols' );
            return false;
        }
        else
        {
            setErrorRoleGroupName( '' );
            return true
        }
    }
    return <span>
        { id ?
            <Edit style={{cursor:'pointer'}} onClick={ ()=>{ setOpen( true ); } } /> :
            <Button variant="contained" color="primary" onClick={()=>{ setOpen( true ); }}>Add New Role Group</Button>
        }
        <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    { id ? 'Edit role group' : 'Add new role group' }
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <TextField label='Role Group Name'
                                           helperText={ errorRoleGroupName }
                                           error={ errorRoleGroupName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setRoleGroupName( value );
                                               validateRoleGroupName( value );
                                           } }
                                           required
                                           autoComplete="off"
                                           defaultValue={ name ? name : '' }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button ref={refButton} variant="contained" color="primary" onClick={ async () => {
                                    const valid = validateRoleGroupName( roleGroupName );
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
                                        jSonResponse = await API.update_RoleGroup( id, roleGroupName );
                                    else
                                        jSonResponse = await API.add_RoleGroup( roleGroupName );

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
                                        <Alert severity="success">Role Group was successfully {id?'updated':'added'}</Alert>
                                        ,refMsg.current );

                                }}>{ id ? 'Edit Role Group' : 'Add Role Group' }</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button ref={refCancel} variant="contained" color="primary" onClick={ () => { setOpen(false ); } }>Cancel</Button>
                                <Button ref={refClose} style={{display:'none'}} variant="contained" color="primary" onClick={ () => { window.location = id ? `/rolegroups/rolegroup?id=${id}` : `/rolegroups` } }>Close</Button>
                                <div ref={refMsg}></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
    </span>;
}
