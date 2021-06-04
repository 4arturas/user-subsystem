import React from "react";
import Paper from "@material-ui/core/Paper";
import {Input, LinearProgress} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import EnhancedTableHead from "./EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {makeStyles} from "@material-ui/core/styles";

const useGlobalTableStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function CommonTable( { headCells, data, RowComponent }  )
{
    const [rows, setRows]                   = React.useState(null);
    const [rowsBackup, setRowsBackup]       = React.useState([]);
    const refSearchBox                      = React.useRef();
    const [noDataFound, setNoDataFound]     = React.useState( false ); // this value is needed because if by search criteria we have 0 rows, weird error is received for which I have no explanation, so this value is needed as workaround

    React.useEffect(()=>
    {
        setRows( data );
        setRowsBackup( data );
    }, [] );

    const classes                           = useGlobalTableStyles();
    const [order, setOrder]                 = React.useState('asc');
    const [orderBy, setOrderBy]             = React.useState('user_name');
    const [page, setPage]                   = React.useState(0);
    const [rowsPerPage, setRowsPerPage]     = React.useState(10);

    const [searchValue, setSearchValue]     = React.useState('');

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                        headCells={headCells}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {

                                                return (
                                                    <RowComponent row={row} searchValue={searchValue} />
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