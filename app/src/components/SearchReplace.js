import React from "react";
import {Typography} from "@material-ui/core";

function SearchReplace( {value, markValue} )
{
    const begin = value.toLowerCase().indexOf( markValue.toLowerCase() );
    if ( begin === -1 )
    {
        return value;
    }
    else
    {
        const end = begin + markValue.length;
        let marked = ''
        let i;
        for ( i = 0; i < begin; i++ )
            marked += value.charAt( i );
        marked += '<span style="background-color: yellow; padding-top: 5px">';
        for ( i = begin; i < end; i++ )
            marked += value.charAt( i );
        marked += '</span>';
        for ( i = end; i < value.length; i++ )
            marked += value.charAt(i);

        return <Typography dangerouslySetInnerHTML={{ __html: marked }}/>;
    }
}

export default SearchReplace;