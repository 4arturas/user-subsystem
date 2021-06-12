import React from "react";
import {Button, CircularProgress, Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import OrganizationAddEdit from "./OrganizationAddEdit";
import CommonTable from "./CommonTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {NavLink} from "react-router-dom";
import SearchReplace from "./SearchReplace";

const userHeadCells = [
    { id: 'user_name', numeric: false, disablePadding: false, label: 'User Name' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'user_add_date', numeric: false, disablePadding: false, label: 'User Add Date' },
    { id: 'belongs', numeric: false, disablePadding: false, label: 'Attach from / Detach to Organization' }
];

function UserRow( { row, searchValue, rowComponentExt1 } )
{
    const [userBelongsToOrganization, setUserBelongsToOrganization]     = React.useState(0  );
    const [operation, setOperation]                                     = React.useState( false );
    const user_add_date                                                 = GB.format_Date1(row.user_add_date);

    React.useEffect( ()=> {
        setUserBelongsToOrganization( row.belongs );
    }, [] );

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
            <TableCell align="left" style={{whiteSpace:'nowrap'}}>
                {
                    operation ? <CircularProgress size={30}/> :
                        userBelongsToOrganization ?
                            <Button variant="contained" color="primary" onClick={ async () => {
                                setOperation( true );
                                const organizationId = rowComponentExt1;
                                const jSonResult = await API.detach_UserFromOrganization( row.user_id, organizationId );
                                console.log( jSonResult );
                                setUserBelongsToOrganization( 0 );
                                setOperation( false );
                            } }>
                                <SearchReplace value="DETACH" markValue={searchValue}/>
                            </Button>
                            :
                            <Button variant="contained" color="secondary" onClick={ async () => {
                                setOperation( true );
                                const organizationId = rowComponentExt1;
                                const jSonResult = await API.attach_UserToOrganization( row.user_id, organizationId );
                                console.log( jSonResult );
                                setUserBelongsToOrganization( 1 );
                                setOperation( false );
                            }} >
                                <SearchReplace value="ATTACH" markValue={searchValue}/>
                            </Button>
                }
            </TableCell>
        </TableRow>
    );
};

function Organization()
{
    const [organization, setOrganization]   = React.useState(null);
    const [users, setUsers]                 = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const organizationId = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_Organization( organizationId );
        setOrganization( data );
        const usersdata = await API.get_UsersByOrganizationWithBelongInfo( organizationId );
        setUsers( usersdata );
    }, [] );

    return (
        <div>
            {organization===null ? <div>Loading...</div> :
            <div>
                <table>
                    <tr>
                        <td style={{width:'50%'}}></td>
                        <td>
                            <Paper>
                                <div className="entity">
                                <h1>Organization&nbsp;<OrganizationAddEdit id={organization.org_id} name={organization.org_name}/></h1>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Organization Name</td>
                                            <td>{organization.org_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Organization Add Date</td>
                                            <td>{GB.format_Date1(organization.org_add_date)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </Paper>
                        </td>
                        <td style={{width:'50%'}}></td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <td style={{width:'50%'}}></td>
                        <td>
                            {users === null ?
                                <></> :
                                <CommonTable headCells={userHeadCells} data={users} RowComponent={UserRow}
                                             rowComponentExt1={organizationId}/>
                            }
                        </td>
                        <td style={{width:'50%'}}></td>
                    </tr>
                </table>
            </div>
            }
        </div>
    );
};

export default Organization
