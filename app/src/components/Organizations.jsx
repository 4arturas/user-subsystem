import React from 'react'
import {Button, Dialog, Input} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import EnhancedTableHead from "./EnhancedTableHead";
import API from "../API";
import {NavLink} from "react-router-dom";
import * as GS from "./globalTableStuff"
import SearchReplace from "./SearchReplace";
import CommonTable from "./CommonTable";

function AddOrganization()
{
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = async () =>
    {
        setOpen(true);
    };

    const handleClose = (value) =>
    {
        setOpen(false);
    };

    return (
        <span>
        <Button variant="contained" color="primary" onClick={() => { handleClickOpen(); }}>
            Add new organization
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="xl">
            <div style={{padding: '5px'}}>
                <div style={{borderBottom: '1px solid gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 'large'}}>
                    Add new organization
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Organization name:</td>
                            <td><Input/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button>Add organization</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Dialog>
        </span>
    );
}

function OrganizationsRow( {row, searchValue} )
{
    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.org_id}
        >
            <TableCell align="left">
                <NavLink to={"/organizations/organization?id=" + row.org_id}><SearchReplace value={row.org_name} markValue={searchValue}/></NavLink>
            </TableCell>
            <TableCell align="left"><SearchReplace value={row.org_add_date} markValue={searchValue}/></TableCell>
        </TableRow>
    );
}

function Organizations( {clientId} )
{
    const headCells = [
        { id: 'org_name', numeric: false, disablePadding: false, label: 'Organization Name' },
        { id: 'org_add_date', numeric: false, disablePadding: false, label: 'Organization Add Date' }
    ];

    const [data, setData] = React.useState( null );
    React.useEffect(async ()=>
    {
        let organizations;
        if ( clientId !== null )
            organizations = await API.get_OrganizationsByClient( clientId );
        else
            organizations = await API.get_Organizations();

        setData( organizations );
    }, [] );

    return (
        <div>{ !data ? <></> : <CommonTable headCells={headCells} data={ data } RowComponent={ OrganizationsRow } />}</div>
    );
}

export default Organizations
