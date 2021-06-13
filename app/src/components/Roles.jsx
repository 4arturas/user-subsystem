import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import API from "../API";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";
import CommonTable from "./CommonTable";
import * as GB from "../global";
import ClientAddEdit from "./ClientAddEdit";
import RoleAddEdit from "./RoleAddEdit";

function RolesRow( {row, searchValue} )
{
    const role_add_date = GB.format_Date1(row.role_add_date);
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.role_id}
        >
            <TableCell align="left">
                <NavLink to={"/roles/role?id=" + row.role_id}><SearchReplace value={row.role_name} markValue={searchValue}/></NavLink>
            </TableCell>
            <TableCell align="left"><SearchReplace value={role_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
}

function Roles( { userId } )
{
    const headCells = [
        { id: 'role_name', numeric: false, disablePadding: false, label: 'Role Name' },
        { id: 'role_add_date', numeric: false, disablePadding: false, label: 'Role Add Date' }
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async ()=>
    {
        let roles;
        if ( userId !== null )
            roles = await API.get_RolesByUserId( userId );
        else
            roles = await API.get_Roles();
        setData( roles );
        // return data;
    }, [] );

    return (
        <div>
            <div style={{marginBottom:'5px'}}><RoleAddEdit/></div>
            { !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ RolesRow } /> }
        </div>
    );
}

export default Roles
