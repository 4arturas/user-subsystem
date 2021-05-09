const get_Data = async ( url ) =>
{
    const request = await fetch( url );
    const data = await request.json();
    return data;
}


const url = 'http://localhost:4004/api/';

class API
{
    get_Clients()
    {
        return get_Data( url + 'clients' );
    }
    get_Client( id )
    {
        return get_Data( url + 'clients/client?id='+id );
    }
    get_Organizations()
    {
        return get_Data( url + 'organizations' );
    }
    get_Organization( id )
    {
        return get_Data( url + 'organizations/organization?id='+id );
    }
    get_OrganizationsByClient( clientId )
    {
        return get_Data( url + 'organizations/client?clientId='+clientId );
    }
    get_Users()
    {
        return get_Data( url + 'users' );
    }

    get_User( id )
    {
        return get_Data( url + 'users/user?id='+id );
    }
    get_UsersByOrganization( organizationId )
    {
        return get_Data( url + 'users/organization?organizationId='+organizationId );
    }
    get_Roles()
    {
        return get_Data( url + 'roles' );
    }

    get_Role( id )
    {
        return get_Data( url + 'roles/role?id='+id );
    }

    get_RolesByUserId( userId )
    {
        return get_Data( url + 'roles/user?userId='+userId );
    }
}
export default new API();