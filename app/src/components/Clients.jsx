import React from 'react'
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import {makeStyles} from "@material-ui/core/styles";
import EnhancedTableHead from "./EnhancedTableHead";
import API from "../API";
import {NavLink} from "react-router-dom";
import * as GS from "./globalTableStuff"

const headCells = [
    { id: 'client_name', numeric: false, disablePadding: false, label: 'Client Name' },
    { id: 'client_add_date', numeric: false, disablePadding: false, label: 'Client Add Date' }
];

function Clients()
{

    const [rows, setRows] = React.useState([]);

    React.useEffect(async ()=>
    {
        const clients = await API.get_Clients();
        setRows( clients );
        // return data;
    }, [] );

    const classes = GS.useGlobalTableStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
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
                                        const url = "/clients/client?id=" + row.client_id;
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.client_id}
                                            >
                                                <TableCell align="left">
                                                    <NavLink to={url}>
                                                        {row.client_name}
                                                    </NavLink>
                                                </TableCell>
                                                <TableCell align="left">{row.client_add_date}</TableCell>
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

export default Clients
