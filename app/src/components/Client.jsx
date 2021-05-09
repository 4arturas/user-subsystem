import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'

function Client()
{
    const [client, setClient] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    React.useEffect(async ()=>
    {
        const id = query.get('id');

        const data = await API.get_Client( id );
        setClient( data );
        console.log( data );
    }, [] );

    return (
        <div>
            {client===null ? '<div>Loading...</div>' :
            <Paper>
                <div className="entity">
                <h1>Client</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Client Name</td>
                            <td>{client.client_name}</td>
                        </tr>
                        <tr>
                            <td>Client Add Date</td>
                            <td>{client.client_add_date}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </Paper>
            }
        </div>
    );
}

export default Client