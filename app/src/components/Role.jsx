import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import * as GB from "../global";
import ClientAddEdit from "./ClientAddEdit";
import RoleAddEdit from "./RoleAddEdit";

function Role()
{
    const [role, setRole] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const roleId = query.get('id');

        const data = await API.get_Role( roleId );
        setRole( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {role===null ? <div>Loading...</div> :
                <div>
                    <table>
                        <tr>
                            <td style={{width:'50%'}}></td>
                            <td>
                                <Paper>
                                    <div className="entity">
                                        <h1>
                                            Role&nbsp;<RoleAddEdit id={role.role_id} name={role.role_name}/>
                                        </h1>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Role Name</td>
                                                <td>{role.client_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Role add date</td>
                                                <td>{GB.format_Date1(role.role_add_date)}</td>
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

export default Role
