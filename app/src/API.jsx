const g_Url = '/api/';

const get_Data = async ( url ) =>
{
    const request = await fetch( g_Url + url );
    const data = await request.json();
    return data;
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