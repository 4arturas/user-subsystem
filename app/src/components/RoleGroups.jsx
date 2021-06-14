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
import RoleGroupAddEdit from "./RoleGroupAddEdit";

function RoleGroupsRow( {row, searchValue} )
{
    const role_group_add_date = GB.format_Date1(row.role_group_add_date);
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.role_group_id}
        >
            <TableCell align="left">
                <NavLink to={"/rolegroups/rolegroup?id=" + row.role_group_id}><SearchReplace value={row.role_group_name} markValue={searchValue}/></NavLink>
            </TableCell>
            <TableCell align="left"><SearchReplace value={role_group_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
}

function RoleGroups( { userId } )
{
    const headCells = [
        { id: 'role_group_name', numeric: false, disablePadding: false, label: 'Role Group Name' },
        { id: 'role_group_add_date', numeric: false, disablePadding: false, label: 'Role Group Add Date' }
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async ()=>
    {
        let roles;
        if ( userId !== null )
            roles = await API.get_RolesByUserId( userId );
        else
            roles = await API.get_RoleGroups();
        console.log( roles );
        setData( roles );
        // return data;
    }, [] );

    return (
        <div>
            <div style={{marginBottom:'5px'}}><RoleGroupAddEdit/></div>
            { !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ RoleGroupsRow } /> }
        </div>
    );
}

export default RoleGroups
