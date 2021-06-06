import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import Roles from "./Roles";
import EntityBlock from "./EntityBlock";
import * as GB from "../global";

function UserChild( {user} )
{
    return (
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
            <td>{GB.format_Date1(user.user_add_date)}</td>
        </tr>
        </tbody>
    </table>
    );
}

function User()
{
    const [user, setUser] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_User( id );
        setUser( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {user===null ? <div>Loading...</div> :
                <div>
                    <EntityBlock title='User' child={ <UserChild user={user}/> }/>
                    Following roles are assigned to this user:
                    <div>
                        <Roles userId={id}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default User
