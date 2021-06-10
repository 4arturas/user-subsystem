import React from "react";
import {Paper} from "@material-ui/core";
import API from "../API";
import './entity.css'
import Users from "./Users";
import * as GB from "../global";
import OrganizationAddEdit from "./OrganizationAddEdit";

function Organization()
{
    const [organization, setOrganization] = React.useState(null);
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    React.useEffect(async ()=>
    {
        const data = await API.get_Organization( id );
        setOrganization( data );
        console.log( data );
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
                            <Users organizationId={id}/>
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