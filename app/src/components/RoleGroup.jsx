import React from "react";
import {Button, CircularProgress, Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import RoleGroupAddEdit from "./RoleGroupAddEdit";
import CommonTable from "./CommonTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";

const rolesHeadCells = [
    { id: 'role_name', numeric: false, disablePadding: false, label: 'Role Name' },
    { id: 'role_add_date', numeric: false, disablePadding: false, label: 'Role Add Date' }
];

function RoleRow( { row, searchValue, rowComponentExt1 } )
{
    const [roleBelongsToClient, setRoleBelongsToClient]   = React.useState( 0 );
    const [operation, setOperation] = React.useState( false );

    React.useEffect( () => {
        setRoleBelongsToClient( row.belongs );
    }, [] );

    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.role_id}>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <NavLink to={`/organizations/organization?id=${row.role_id}`}>
                    <SearchReplace value={row.role_name} markValue={searchValue}/>
                </NavLink>
            </TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <SearchReplace value={GB.format_Date1(row.role_add_date)} markValue={searchValue}/>
            </TableCell>
            <TableCell align="center">
                { operation ? <CircularProgress size={30}/> :
                    roleBelongsToClient ?
                        <Button variant="contained" color="primary" onClick={ async () => {
                            setOperation( true );
                            const roleGroupId = rowComponentExt1;
                            const jSonResult = await API.detach_RoleFromRoleGroups( row.role_id, roleGroupId );
                            setRoleBelongsToClient( 0 );
                            setOperation( false );
                        } }>
                            <SearchReplace value="DETACH" markValue={searchValue}/>
                        </Button>
                        :
                        <Button variant="contained" color="secondary" onClick={ async () => {
                            setOperation( true );
                            const roleGroupId = rowComponentExt1;
                            const jSonResult = await API.attach_RoleToRoleGroups( row.role_id, roleGroupId );
                            setRoleBelongsToClient( 1 );
                            setOperation( false );
                        }} >
                            <SearchReplace value="ATTACH" markValue={searchValue}/>
                        </Button>
                }
            </TableCell>
        </TableRow>
    );
}

function RoleGroup()
{
    const [roleGroup, setRoleGroup] = React.useState(null);
    const [roles, setRoles]         = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const roleGroupId = query.get('id');

        const data = await API.get_RoleGroup( roleGroupId );
        setRoleGroup( data );

        const rolesData = await API.get_RolesWithBelongToRolesGroupInfo( roleGroupId );
        setRoles( rolesData );
    }, [] );

    return (
        <div>
            {roleGroup===null ? <div>Loading...</div> :
                <div>
                    <table>
                        <tr>
                            <td style={{width:'50%'}}></td>
                            <td>
                                <Paper>
                                    <div className="entity">
                                        <h1>
                                            Role Group&nbsp;<RoleGroupAddEdit id={roleGroup.role_group_id} name={roleGroup.role_group_name}/>
                                        </h1>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Role Group Name</td>
                                                <td>{roleGroup.role_group_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Role Group add date</td>
                                                <td>{GB.format_Date1(roleGroup.role_group_add_date)}</td>
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
                                    roles === null ?
                                        <div>Loading...</div> :
                                        <CommonTable headCells={rolesHeadCells} data={ roles } RowComponent={ RoleRow } rowComponentExt1={roleGroup.role_group_id} />
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

export default RoleGroup
