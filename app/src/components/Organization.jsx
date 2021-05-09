import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'

function Organization()
{
    const [organization, setOrganization] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const id = query.get('id');

        const data = await API.get_Organization( id );
        setOrganization( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {organization===null ? <div>Loading...</div> :
            <Paper>
                <div className="entity">
                <h1>Organization</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Organization Name</td>
                            <td>{organization.org_name}</td>
                        </tr>
                        <tr>
                            <td>Organization Add Date</td>
                            <td>{organization.org_add_date}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </Paper>
            }
        </div>
    );
}

export default Organization