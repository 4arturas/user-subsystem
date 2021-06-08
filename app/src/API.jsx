const g_Url = '/api/';

const get_Data = async ( url ) =>
{
    const request = await fetch( g_Url + url );
    const data = await request.json();
    return data;
}
const add_Data = async ( url, jSonRequest ) =>
{
    let jSonResponse;
    const requestUrl = g_Url + url;
    await fetch( requestUrl , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        // todo: state is not really supposed to be sent here - fix on AS side needed
        body: JSON.stringify( jSonRequest )
    })
        .then(res => res.json())
        .then(json => {
            jSonResponse = json;
            // console.log(json)
        } )
        .catch(err => {
            console.error('ERROR: ' + err);
        });
    await jSonResponse;
    return jSonResponse;
}

class API
{
    get_Clients()
    {
        return get_Data( 'clients' );
    }
    get_Client( id )
    {
        return get_Data( 'clients/client?id='+id );
    }
    get_Organizations()
    {
        return get_Data( 'organizations' );
    }
    get_Organization( id )
    {
        return get_Data( 'organizations/organization?id='+id );
    }
    get_OrganizationsByClient( clientId )
    {
        return get_Data( 'organizations/client?clientId='+clientId );
    }
    get_OrganizationsNotBelongingToClient( clientId )
    {
        return get_Data( 'organizations/client/not?clientId='+clientId );
    }
    attach_ClientToOrganization( clientId, organizationId  )
    {
        const jSon = { clientId: clientId, organizationId: organizationId };
        const jSonResponse = add_Data( 'organizations/client/attach', jSon );
        return jSonResponse;
    }
    detach_ClientFromOrganization( clientId, organizationId  )
    {
        const jSon = { clientId: clientId, organizationId: organizationId };
        const jSonResponse = add_Data( 'organizations/client/detach', jSon );
        return jSonResponse;
    }
    get_Users()
    {
        return get_Data( 'users' );
    }

    get_User( id )
    {
        return get_Data( 'users/user?id='+id );
    }
    get_UsersByOrganization( organizationId )
    {
        return get_Data( 'users/organization?organizationId='+organizationId );
    }
    add_NewUser( organizationId, userName, userPassword, firstName, lastName )
    {
        const jSon = { organizationId: organizationId, userName: userName, userPassword: userPassword, firstName: firstName, lastName: lastName };
        const jSonResponse = add_Data( 'users/add', jSon );
        return jSonResponse;
    }
    get_Roles()
    {
        return get_Data( 'roles' );
    }

    get_Role( id )
    {
        return get_Data( 'roles/role?id='+id );
    }

    get_RolesByUserId( userId )
    {
        return get_Data( 'roles/user?userId='+userId );
    }
}
export default new API();