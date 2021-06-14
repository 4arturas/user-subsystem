import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import RoleGroupAddEdit from "./RoleGroupAddEdit";

function RoleGroup()
{
    const [roleGroup, setRoleGroup] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const roleGroupId = query.get('id');

        const data = await API.get_RoleGroup( roleGroupId );
        setRoleGroup( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {roleGroup===null ? <div>Loading...</div> :
                <div>
                    <table>
                        <tr>
                            <td style={{width:'50%'}}></td>
                            <td>
                                <Paper>
                                    <div className="entity">
                                        <h1>
                                            Role Group&nbsp;<RoleGroupAddEdit id={roleGroup.role_group_id} name={roleGroup.role_group_name}/>
                                        </h1>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Role Group Name</td>
                                                <td>{roleGroup.role_group_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Role Group add date</td>
                                                <td>{GB.format_Date1(roleGroup.role_group_add_date)}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Paper>
                            </td>
                            <td style={{width:'50%'}}></td>
                        </tr>
                    </table>
                </div>
            }
        </div>
    );
}

export default RoleGroup
