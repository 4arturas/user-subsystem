import React from "react";
import {Button, CircularProgress, Dialog} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import EntityBlock from "./EntityBlock";
import CommonTable from "./CommonTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SearchReplace from "./SearchReplace";

function ClientChild( {client} )
{
    return (
        <table>
            <tbody>
            <tr>
                <td>Client Name</td>
                <td>{client.client_name}</td>
            </tr>
            <tr>
                <td>Client add date</td>
                <td>{GB.format_Date1(client.client_add_date)}</td>
            </tr>
            </tbody>
        </table>
    );
}
function OrganizationsRow( {row, searchValue, rowComponentExt1/*operation*/, rowComponentExt2} )
{
    const operation = ( org_id ) =>
    {
        const operation = rowComponentExt1;
        const clientId  = rowComponentExt2;
        let jSonResult;
        if ( operation === OPERATION_SHOW )
            jSonResult = API.detach_ClientFromOrganization( clientId, org_id );
        else
            jSonResult = API.attach_ClientToOrganization( clientId, org_id );
    }
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.org_id}>
            <TableCell align="left">{row.org_id}</TableCell>
            <TableCell align="left"><SearchReplace value={row.org_name} markValue={searchValue}/></TableCell>
            <TableCell align="left">
                <Button variant="contained" color="primary" onClick={() => { operation( row.org_id); }}>
                    {rowComponentExt1===OPERATION_SHOW?<>Detach</>:<>Attach</>}
                </Button>
            </TableCell>
        </TableRow>
    );
}

const OPERATION_SHOW        = 0;
const OPERATION_ATTACH      = 1;

function ShowOrganizations( { operation, clientId } )
{
    const headCells = [
        { id: 'org_id', numeric: false, disablePadding: false, label: 'org_id' },
        { id: 'org_name', numeric: false, disablePadding: false, label: 'Organization Name' },
        { id: 'org_add_date', numeric: false, disablePadding: false, label: 'Action' }
    ];

    const [open, setOpen]   = React.useState(false);
    const [data, setData]   = React.useState( null );

    const handleClickOpen = async () =>
    {
        setOpen(true);
        let organizations;
        if ( operation === OPERATION_SHOW )
        {
            organizations = await API.get_OrganizationsByClient(clientId);
            setData( organizations );
        }
        else
        {
            organizations = await API.get_OrganizationsNotBelongingToClient(clientId);
            const newOrganizations = [];
            for ( let i = 0; i < organizations.length; i++ )
            {
                const organization = organizations[i];
                if ( organizations.end_date !== null )
                    continue;
                newOrganizations.push( organization );
            } // end for i
            setData( newOrganizations );
        }

    };

    const handleClose = (value) =>
    {
        setOpen(false);
    };

    return (
        <>
            { operation === OPERATION_SHOW ?
                <>
                    <Button variant="contained" color="primary" onClick={() => { handleClickOpen(); }}>
                        Show
                    </Button> organizations belonging to client
                </> :
                <>
                    <Button variant="contained" color="primary" onClick={() => { handleClickOpen(); }}>
                        Show
                    </Button> organizations <strong>not</strong> belonging to client
                </>
            }
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl" style={{width:'80%',height:'80%'}}>
            <div style={{padding: '20px'}}>
                <div>{ !data ? <><CircularProgress size={15}/>&nbsp;&nbsp;&nbsp;Wait a second ...</> : <CommonTable headCells={headCells} data={ data } RowComponent={ OrganizationsRow } rowComponentExt1={operation} rowComponentExt2={clientId} />}</div>
            </div>
        </Dialog>
        </>
    );
}

function Client()
{
    const [client, setClient] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_Client( id );
        setClient( data );
    }, [] );

    return (
        <div>
            {client===null ? <div>Loading...</div> :
            <div>
                <EntityBlock title='Client' child={ <ClientChild client={client}/> }/>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <td><ShowOrganizations operation={OPERATION_SHOW} clientId={client.client_id}/></td>
                    </tr>
                    <tr>
                        <td><ShowOrganizations operation={OPERATION_ATTACH} clientId={client.client_id}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}

export default Client