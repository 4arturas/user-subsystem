import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import API from "../API";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";
import CommonTable from "./CommonTable";
import * as GB from "../global";
import {Button, CircularProgress, Dialog, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function ClientRow( {row, searchValue} )
{
    const client_add_date = GB.format_Date1(row.client_add_date);
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.client_id}
        >
            <TableCell align="left"><NavLink to={`/clients/client?id=${row.client_id}`}><SearchReplace value={row.client_name} markValue={searchValue}/></NavLink></TableCell>
            <TableCell align="left"><SearchReplace value={client_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
}

function AddNewClient()
{
    const refButton = React.useRef();
    const refCancel = React.useRef();
    const refClose = React.useRef();
    const refInfo = React.useRef();
    const refSuccess = React.useRef();
    const [open, setOpen]   = React.useState(false);
    const handleClickOpen = () =>
    {
        setOpen(true);
    };

    const handleClose = (value) =>
    {
        setOpen(false);
    };
    const [ clientName, setClientName ]             = React.useState('');
    const [errorClientName, setErrorClientName]     = React.useState('');
    const validateClientName = ( value ) =>
    {
        if ( value.length === 0 )
        {
            setErrorClientName( 'More than 0 symbols' );
            return false;
        }
        else if ( value.length > 6 )
        {
            setErrorClientName( 'Less than 6 symbols' );
            return false;
        }
        else
        {
            setErrorClientName( '' );
            return true
        }
    }
    return <span>
        <Button variant="contained" color="primary" onClick={()=>{ handleClickOpen(); }}>Add New Client</Button>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl"
                disableBackdropClick
                disableEscapeKeyDown>
            <div style={{padding: '20px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    Add new client
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
                                           autoComplete="off"/>
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

                                    const jSonResponse = await API.add_Client( clientName );

                                    refButton.current.style.display = 'none';
                                    refCancel.current.style.display = 'none';
                                    refClose.current.style.display = '';
                                    refInfo.current.style.display = 'none';
                                    refSuccess.current.style.display = '';
                                }}>Add Client</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button ref={refCancel} variant="contained" color="primary" onClick={ () => { handleClose('novalue'); } }>Cancel</Button>

                                <Alert ref={refSuccess} style={{display:'none'}} severity="success">Client was successfully added</Alert>
                                <Button ref={refClose} style={{display:'none'}} variant="contained" color="primary" onClick={ () => { window.location = '/clients' } }>Close</Button>

                                <Alert ref={refInfo} style={{display:'none'}} severity="info"><CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...</Alert>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
    </span>;
}


export default function Clients()
{

    const headCells = [
        { id: 'client_name', numeric: false, disablePadding: false, label: 'Client Name' },
        { id: 'client_add_date', numeric: false, disablePadding: false, label: 'Client Add Date' }
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async ()=>
    {
        const clients = await API.get_Clients();
        // return data;
        setData( clients );
    }, [] );



    return (
        <div>
            <div style={{marginBottom:'5px'}}><AddNewClient/></div>
            { !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ ClientRow } />}
        </div>
    );
}
