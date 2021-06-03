import React from 'react'
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
import {Input, LinearProgress, Typography} from "@material-ui/core";
import * as GS from "./globalTableStuff"

const headCells = [
    { id: 'user_name', numeric: false, disablePadding: false, label: 'User Name' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'user_add_date', numeric: false, disablePadding: false, label: 'User Add Date' }
];

function Users( { organizationId}  )
{
    const [rows, setRows] = React.useState(null);
    const [rowsBackup, setRowsBackup] = React.useState([]);
    const refSearchBox      = React.useRef();
    const [noDataFound, setNoDataFound] = React.useState( false ); // this value is needed because if by search criteria we have 0 rows, weird error is received for which I have no explanation, so this value is needed as workaround

    React.useEffect(async ()=>
    {
        let users;
        if ( organizationId !== null )
            users = await API.get_UsersByOrganization( organizationId );
        else
            users = await API.get_Users();
        setRows( users );
        setRowsBackup( users );
    }, [] );

    const classes = GS.useGlobalTableStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('user_name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [searchValue, setSearchValue] = React.useState('');

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

    const handleSearch = (event) =>
    {
        const searchBoxValue = event.target.value;
        setSearchValue( searchBoxValue );
        let keys;
        if ( rows.length > 0 )
            keys = Object.keys( rows[0] );
        const newRows = [];
        const regex = new RegExp(searchBoxValue, 'i');
        for ( let i = 0; i < rowsBackup.length; i++ )
        {
            const row = rowsBackup[i];
            let containsSearchFragment = false;
            for ( let j = 0; j < keys.length; j++ )
            {
                const key = keys[j];
                const value = row[key] + '';
                if ( regex.test( value ) )
                {
                    containsSearchFragment = true;
                    break;
                } // end if
            } // end for j
            if ( containsSearchFragment )
            {
                newRows.push( row );
            }
        } // end for i
        if ( newRows.length === 0 )
        {
            setNoDataFound( true );
        }
        else
        {
            setNoDataFound( false );
            setRows( newRows );
        }
    }
    function SearchReplace( {value, markValue} )
    {
        const begin = value.toLowerCase().indexOf( markValue.toLowerCase() );
        if ( begin === -1 )
        {
            return value;
        }
        else
        {
            const end = begin + markValue.length;
            let marked = ''
            let i;
            for ( i = 0; i < begin; i++ )
                marked += value.charAt( i );
            marked += '<span style="background-color: yellow; padding-top: 5px">';
            for ( i = begin; i < end; i++ )
                marked += value.charAt( i );
            marked += '</span>';
            for ( i = end; i < value.length; i++ )
                marked += value.charAt(i);

            return <Typography dangerouslySetInnerHTML={{ __html: marked }}/>;
        }
    }
    return (
        <div>
            <Paper>
                <div style={{textAlign:'center'}}><strong>Search:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<Input ref={refSearchBox} onChange={handleSearch} /></div>
                { rows === null ? <LinearProgress /> :
                    noDataFound ? <div>No data found by search criteria</div> :
                <div>
                <TableContainer>
                    <Table
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
                                        <TableRow hidden={true}
                                            hover
                                            tabIndex={-1}
                                            key={row.user_id}
                                        >
                                            <TableCell align="left">
                                                <NavLink to={"/users/user?id=" + row.user_id}>
                                                    <SearchReplace value={row.user_name} markValue={searchValue}/>
                                                </NavLink>
                                            </TableCell>
                                            <TableCell align="left"><SearchReplace value={row.first_name} markValue={searchValue}/></TableCell>
                                            <TableCell align="left"><SearchReplace value={row.last_name} markValue={searchValue}/></TableCell>
                                            <TableCell align="left"><SearchReplace value={row.user_add_date} markValue={searchValue}/></TableCell>
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
                </div>
                }
            </Paper>
        </div>
    );
}

export default Users
