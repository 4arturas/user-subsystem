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
    add_Client( clientName )
    {
        const jSon = { clientName: clientName };
        const jSonResponse = add_Data( 'clients/add', jSon );
        return jSonResponse;
    }
    update_Client( clientId, clientName )
    {
        const jSon = { clientId: clientId, clientName: clientName };
        const jSonResponse = add_Data( 'clients/update', jSon );
        return jSonResponse;
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
    get_OrganizationsWithBelongInfo( clientId )
    {
        return get_Data( 'organizations/client/belong/info?clientId='+clientId );
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
    add_Organization( organizationName )
    {
        const jSon = { organizationName: organizationName };
        const jSonResponse = add_Data( 'organizations/add', jSon );
        return jSonResponse;
    }
    update_Organization( organizationId, organizationName )
    {
        const jSon = { organizationId: organizationId, organizationName: organizationName };
        const jSonResponse = add_Data( 'organizations/update', jSon );
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
    get_UsersByOrganizationWithBelongInfo( organizationId )
    {
        return get_Data( 'users/organization/belongs?organizationId='+organizationId );
    }
    add_NewUser( organizationId, userName, userPassword, firstName, lastName )
    {
        const jSon = { organizationId: organizationId, userName: userName, userPassword: userPassword, firstName: firstName, lastName: lastName };
        const jSonResponse = add_Data( 'users/add', jSon );
        return jSonResponse;
    }
    detach_UserFromOrganization( userId, organizationId )
    {
        const jSon = { userId: userId, organizationId: organizationId };
        const jSonResponse = add_Data( 'users/organization/detach', jSon );
        return jSonResponse;
    }
    attach_UserToOrganization( userId, organizationId )
    {
        const jSon = { userId: userId, organizationId: organizationId };
        const jSonResponse = add_Data( 'users/organization/attach', jSon );
        return jSonResponse;
    }
    update_User( userId, userName, firstName, lastName )
    {
        const jSon = { userId: userId, userName: userName, firstName: firstName, lastName: lastName };
        const jSonResponse = add_Data( 'users/update', jSon );
        return jSonResponse;
    }
    add_User( userName, firstName, lastName )
    {
        const jSon = { userName: userName, firstName: firstName, lastName: lastName };
        const jSonResponse = add_Data( 'users/add', jSon );
        return jSonResponse;
    }

    get_RoleGroups()
    {
        return get_Data( 'rolegroups' );
    }

    add_RoleGroup( roleGroupName )
    {
        const jSon = { roleGroupName: roleGroupName };
        const jSonResponse = add_Data( 'rolegroups/add', jSon );
        return jSonResponse;
    }

    get_RoleGroup( roleGroupId )
    {
        return get_Data( 'rolegroups/rolegroup?id='+roleGroupId );
    }

    update_RoleGroup( roleGroupId, roleGroupName )
    {
        const jSon = { roleGroupId: roleGroupId, roleGroupName: roleGroupName };
        const jSonResponse = add_Data( 'rolegroups/update', jSon );
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

    get_RolesWithBelongInfo( userId )
    {
        return get_Data( 'roles/user/belong/info?userId='+userId );
    }

    get_RolesWithBelongToRolesGroupInfo( roleGroupId )
    {
        return get_Data( 'roles/rolegroups/belong/info?roleGroupId='+roleGroupId );
    }

    detach_RoleFromUser( roleId, userId )
    {
        const jSon = { roleId: roleId, userId: userId };
        const jSonResponse = add_Data( 'roles/user/detach', jSon );
        return jSonResponse;
    }

    attach_RoleToUser( roleId, userId )
    {
        const jSon = { roleId: roleId, userId: userId };
        const jSonResponse = add_Data( 'roles/user/attach', jSon );
        return jSonResponse;
    }

    update_Role( roleId, roleName )
    {
        const jSon = { roleId: roleId, roleName: roleName };
        const jSonResponse = add_Data( 'roles/update', jSon );
        return jSonResponse;
    }

    add_Role( roleName )
    {
        const jSon = { roleName: roleName };
        const jSonResponse = add_Data( 'roles/add', jSon );
        return jSonResponse;
    }

}
export default new API();
