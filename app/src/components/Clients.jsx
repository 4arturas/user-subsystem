import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import API from "../API";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";
import CommonTable from "./CommonTable";
import * as GB from "../global";

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
            <div style={{marginBottom:'5px'}}><ClientAddEdit/></div>
            { !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ ClientRow } />}
        </div>
    );
}
