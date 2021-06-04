import React from "react";
import * as GS from "./globalTableStuff";
import Paper from "@material-ui/core/Paper";
import {Input, LinearProgress} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import EnhancedTableHead from "./EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

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

    const classes                           = GS.useGlobalTableStyles();
    const [order, setOrder]                 = React.useState('asc');
    const [orderBy, setOrderBy]             = React.useState('user_name');
    const [page, setPage]                   = React.useState(0);
    const [rowsPerPage, setRowsPerPage]     = React.useState(10);

    const [searchValue, setSearchValue]     = React.useState('');

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
                                        {GS.stableSort(rows, GS.getComparator(order, orderBy))
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