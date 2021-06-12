import React from "react";
import API from "../API";
import * as GB from "../global";
import {Button, CircularProgress, Paper} from "@material-ui/core";
import CommonTable from "./CommonTable";
import UserAddEdit from "./UserAddEdit";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";

function UserChild( {user} )
{
    return (
    <table>
        <tbody>
        <tr>
            <td>User Name</td>
            <td>{user.user_name}</td>
        </tr>
        <tr>
            <td>First Name</td>
            <td>{user.first_name}</td>
        </tr>
        <tr>
            <td>Last Name</td>
            <td>{user.last_name}</td>
        </tr>
        <tr>
            <td>User Add Date</td>
            <td>{GB.format_Date1(user.user_add_date)}</td>
        </tr>
        </tbody>
    </table>
    );
}

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
                            const userId = rowComponentExt1;
                            const jSonResult = await API.detach_RoleFromUser( userId, row.role_id );
                            setRoleBelongsToClient( 0 );
                            setOperation( false );
                        } }>
                            <SearchReplace value="DETACH" markValue={searchValue}/>
                        </Button>
                        :
                        <Button variant="contained" color="secondary" onClick={ async () => {
                            setOperation( true );
                            const userId = rowComponentExt1;
                            const jSonResult = await API.attach_ClientToOrganization( userId, row.role_id );
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

function User()
{
    const [user, setUser] = React.useState(null);
    const [roles, setRoles] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const userId = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_User( userId );
        setUser( data );

        const rolesData = await API.get_RolesWithBelongInfo( userId );
        setRoles( rolesData );
        console.log( rolesData );

    }, [] );

    return (
        <div>
            {user===null ? <div>Loading...</div> :
                <div>
                    <table>
                        <tr>
                            <td style={{width:'50%'}}></td>
                            <td>
                                <Paper>
                                    <div className="entity">
                                        <h1>
                                            User&nbsp;<UserAddEdit id={user.user_id} name={user.user_name}/>
                                        </h1>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>User Name</td>
                                                <td>{user.user_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Client add date</td>
                                                <td>{GB.format_Date1(user.user_add_date)}</td>
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
                                        <CommonTable headCells={rolesHeadCells} data={ roles } RowComponent={ RoleRow } rowComponentExt1={userId} />
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

export default User
