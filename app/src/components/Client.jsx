import React from "react";
import {Button, CircularProgress, Dialog, Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import CommonTable from "./CommonTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SearchReplace from "./SearchReplace";
import {NavLink} from "react-router-dom";
import ClientAddEdit from "./ClientAddEdit";
import {format_Date1} from "../global";

const headCells = [
    { id: 'org_name', numeric: false, disablePadding: false, label: 'Organization Name' },
    { id: 'org_add_date', numeric: false, disablePadding: false, label: 'Org. Add Date' },
    { id: 'belongs', numeric: false, disablePadding: false, label: 'Action' }
];

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
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <SearchReplace value={GB.format_Date1(row.org_add_date)} markValue={searchValue}/>
            </TableCell>
            <TableCell align="center">
                { operation ? <CircularProgress size={30}/> :
                    organizationBelongsToClient ?
                    <Button variant="contained" color="primary" onClick={ async () => {
                        setOperation( true );
                        const clientId = rowComponentExt1;
                        const jSonResult = await API.detach_ClientFromOrganization( clientId, row.org_id );
                        setOrganizationBelongsToClient( 0 );
                        setOperation( false );
                    } }>
                        <SearchReplace value="DETACH" markValue={searchValue}/>
                    </Button>
                   :
                    <Button variant="contained" color="secondary" onClick={ async () => {
                        setOperation( true );
                        const clientId = rowComponentExt1;
                        const jSonResult = await API.attach_ClientToOrganization( clientId, row.org_id );
                        setOrganizationBelongsToClient( 1 );
                        setOperation( false );
                    }} >
                        <SearchReplace value="ATTACH" markValue={searchValue}/>
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
                <table>
                    <tr>
                        <td style={{width:'50%'}}></td>
                        <td>
                            <Paper>
                                <div className="entity">
                                    <h1>
                                        Client&nbsp;<ClientAddEdit id={client.client_id} name={client.client_name}/>
                                    </h1>
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
                                </div>
                            </Paper>
                        </td>
                        <td style={{width:'50%'}}></td>
                    </tr>
                </table>
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
}

export default Client
