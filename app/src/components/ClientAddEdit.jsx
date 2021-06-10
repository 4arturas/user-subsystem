import React from "react";
import {Button, CircularProgress, Dialog, TextField} from "@material-ui/core";
import API from "../API";
import {Alert} from "@material-ui/lab";
import {Edit} from "@material-ui/icons";

export default function ClientAddEdit( { id, name } )
{
    const refButton = React.useRef();
    const refCancel = React.useRef();
    const refClose = React.useRef();
    const refInfo = React.useRef();
    const refSuccess = React.useRef();
    const [open, setOpen]   = React.useState(false);
    const [ clientName, setClientName ]             = React.useState('');
    const [errorClientName, setErrorClientName]     = React.useState('');
    const validateClientName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorClientName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 11 )
        {
            setErrorClientName( 'Less or equal 11 to symbols' );
            return false;
        }
        else
        {
            setErrorClientName( '' );
            return true
        }
    }
    return <span>
        { id ?
            <Edit style={{cursor:'pointer'}} onClick={ ()=>{ setOpen( true ); } } /> :
            <Button variant="contained" color="primary" onClick={()=>{ setOpen( true ); }}>Add New Client</Button>
        }
        <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    { id ? 'Edit client' : 'Add new client' }
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <TextField label='Client Name'
                                           helperText={ errorClientName }
                                           error={ errorClientName.length > 0 }
                                           onChange={ (event) => {
                                               const value = event.target.value;
                                               setClientName( value );
                                               validateClientName( value );
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
                                    const valid = validateClientName( clientName );
                                    if ( !valid )
                                    {
                                        return;
                                    }
                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = 'none';
                                    refInfo.current.style.display = '';

                                    let jSonResponse;
                                    if ( id )
                                        jSonResponse = await API.edit_Client( id, clientName );
                                    else
                                        jSonResponse = await API.add_Client( clientName );

                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = '';
                                    refInfo.current.style.display = 'none';
                                    refSuccess.current.style.display = '';
                                }}>{ id ? 'Edit Client' : 'Add Client' }</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button ref={refCancel} variant="contained" color="primary" onClick={ () => { setOpen(false ); } }>Cancel</Button>

                                <Alert ref={refSuccess} style={{display:'none'}} severity="success">Client was successfully {id?'updated':'added'}</Alert>
                                <Button ref={refClose} style={{display:'none'}} variant="contained" color="primary" onClick={ () => { window.location = id ? `/clients/client?id=${id}` : `/clients` } }>Close</Button>

                                <Alert ref={refInfo} style={{display:'none'}} severity="info"><CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...</Alert>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
    </span>;
}