import React from 'react'
import {Button, Dialog, Input} from "@material-ui/core";
import EnhancedTable from "./EnhancedTable";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {makeStyles} from "@material-ui/core/styles";
import EnhancedTableHead from "./EnhancedTableHead";
import API from "../API";
import {NavLink} from "react-router-dom";
import * as GS from "./globalTableStuff"

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

const headCells = [
    { id: 'org_name', numeric: false, disablePadding: false, label: 'Organization Name' },
    { id: 'org_add_date', numeric: false, disablePadding: false, label: 'Organization Add Date' }
];

function Organizations( {clientId} )
{

    const [rows, setRows] = React.useState([]);


    React.useEffect(async ()=>
    {
        let organizations;
        if ( clientId !== null )
            organizations = await API.get_OrganizationsByClient( clientId );
        else
            organizations = await API.get_Organizations();

        setRows( organizations );
    }, [] );

    const classes = GS.useGlobalTableStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('org_name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>{rows.length === 0 ? 'Loading...' :
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'small'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {GS.stableSort(rows, GS.getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.org_id}
                                            >
                                                <TableCell align="left">
                                                    <NavLink to={"/organizations/organization?id=" + row.org_id}>
                                                        {row.org_name}
                                                    </NavLink>
                                                </TableCell>
                                                <TableCell align="left">{row.org_add_date}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        }</div>
    );
}

export default Organizations
