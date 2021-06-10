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
import {NavLink} from "react-router-dom";

const headCells = [
    { id: 'org_name', numeric: false, disablePadding: false, label: 'Organization Name' },
    { id: 'org_add_date', numeric: false, disablePadding: false, label: 'Action' }
];

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


function OrganizationsRow( { row, searchValue, rowComponentExt1 } )
{
    const [organizationBelongsToClient, setOrganizationBelongsToClient]   = React.useState( 0 );
    const [operation, setOperation] = React.useState( false );

    React.useEffect( () => {
        setOrganizationBelongsToClient( row.belongs );
    }, [] );

    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.org_id}>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <NavLink to={`/organizations/organization?id=${row.org_id}`}>
                    <SearchReplace value={row.org_name} markValue={searchValue}/>
                </NavLink>
            </TableCell>
            <TableCell align="center">
                { operation ? <CircularProgress size={30}/> :
                    organizationBelongsToClient ?
                    <Button variant="contained" color="primary" onClick={ async () => {
                        setOperation( true );
                        const clientId = rowComponentExt1;
                        const jSonResult = await API.detach_ClientFromOrganization( clientId, row.org_id );
                        console.log( jSonResult );
                        setOrganizationBelongsToClient( 0 );
                        setOperation( false );
                    } }>
                        Detach
                    </Button>
                   :
                    <Button variant="contained" color="secondary" onClick={ async () => {
                        setOperation( true );
                        const clientId = rowComponentExt1;
                        const jSonResult = await API.attach_ClientToOrganization( clientId, row.org_id );
                        console.log( jSonResult );
                        setOrganizationBelongsToClient( 1 );
                        setOperation( false );
                    }} >
                        Attach
                    </Button>
                }
            </TableCell>
        </TableRow>
    );
}


function Client()
{
    const [client, setClient] = React.useState(null);
    const [organizations, setOrganizations] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_Client( id );
        setClient( data );

        const organizationsData = await API.get_OrganizationsWithBelongInfo( id );
        setOrganizations( organizationsData );
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
                        <td style={{width:'50%'}}></td>
                        <td>
                            {
                                organizations === null ?
                                    <div>Loading...</div> :
                                    <CommonTable headCells={headCells} data={ organizations } RowComponent={ OrganizationsRow } rowComponentExt1={id} />
                            }
                        </td>
                        <td style={{width:'50%'}}></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default Client
