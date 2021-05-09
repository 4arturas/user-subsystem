import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'

function Role()
{
    const [role, setRole] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const id = query.get('id');

        const data = await API.get_Role( id );
        setRole( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {role===null ? <div>Loading...</div> :
            <Paper>
                <div className="entity">
                <h1>Organization</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Role Name</td>
                            <td>{role.role_name}</td>
                        </tr>
                        <tr>
                            <td>Role Add Date</td>
                            <td>{role.role_add_date}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </Paper>
            }
        </div>
    );
}

export default Role