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
    get_Organizations()
    {
        return get_Data( url + 'organizations' );
    }
    get_Users()
    {
        return get_Data( url + 'users' );
    }
    get_Roles()
    {
        return get_Data( url + 'roles' );
    }
}
export default new API();