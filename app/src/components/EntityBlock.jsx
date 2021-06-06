import {Paper} from "@material-ui/core";
import React from "react";
import './entity.css'

export default function EntityBlock( { title, child} )
{
    return (
        <table>
            <tr>
                <td style={{width:'50%'}}></td>
                <td>
                    <Paper>
                        <div className="entity">
                            <h1>{title}</h1>
                            {child}
                        </div>
                    </Paper>
                </td>
                <td style={{width:'50%'}}></td>
            </tr>
        </table>
    );
}
