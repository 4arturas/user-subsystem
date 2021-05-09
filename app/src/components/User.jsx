import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'

function User()
{
    const [user, setUser] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const id = query.get('id');

        const data = await API.get_User( id );
        setUser( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {user===null ? <div>Loading...</div> :
            <Paper>
                <div className="entity">
                <h1>User</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td>{user.user_name}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{user.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{user.last_name}</td>
                        </tr>
                        <tr>
                            <td>User Add Date</td>
                            <td>{user.user_add_date}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </Paper>
            }
        </div>
    );
}

export default User