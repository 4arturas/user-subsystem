import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import API from "../API";
import {NavLink} from "react-router-dom";
import CommonTable from "./CommonTable";
import SearchReplace from "./SearchReplace";
import * as GB from "../global";
import UserAddEdit from "./UserAddEdit";

function UserRow( { row, searchValue } )
{
    const user_add_date                                                 = GB.format_Date1(row.user_add_date);

    return (

        <TableRow hidden={true}
                  hover
                  tabIndex={-1}
                  key={row.user_id}
        >
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                <NavLink to={"/users/user?id=" + row.user_id}>
                    <SearchReplace value={row.user_name} markValue={searchValue}/>
                </NavLink>
            </TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={row.first_name} markValue={searchValue}/></TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={row.last_name} markValue={searchValue}/></TableCell>
            <TableCell align="left" style={{whiteSpace:'nowrap'}}><SearchReplace value={user_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
};

export default function Users()
{
    const headCells = [
        { id: 'user_name', numeric: false, disablePadding: false, label: 'User Name' },
        { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
        { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'user_add_date', numeric: false, disablePadding: false, label: 'User Add Date' },
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async () =>
    {
        const users = await API.get_Users();
        setData( users );
    }, [] );

    return (
        <div>
            <div style={{marginBottom:'5px'}}><UserAddEdit/></div>
            { !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ UserRow } /> }
        </div>
    );
}
