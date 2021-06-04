import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import Organizations from "./Organizations";
import * as GB from "../global";

function Client()
{
    const [client, setClient] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_Client( id );
        setClient( data );
    }, [] );

    return (
        <div>
            {client===null ? <div>Loading...</div> :
            <div>
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
                                <td>{GB.format_Date1(client.client_add_date)}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </Paper>
                Following organizations are assigned to this client:
                <div>
                    <Organizations clientId={id}/>
                </div>
            </div>
            }
        </div>
    );
}

export default Client