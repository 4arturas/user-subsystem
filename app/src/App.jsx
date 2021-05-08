import React from 'react'
import './App.css'
import './header.css'
import {
    BrowserRouter, NavLink,
    Route,
    Switch,
    useHistory,
    useLocation
}
    from "react-router-dom";
import Home from "./components/Home";
import Organizations from "./components/Organizations";
import Users from "./components/Users";
import Roles from "./components/Roles";
import Clients from "./components/Clients";

function App()
{

    return (
        <BrowserRouter>
            <div className="header" style={{height:'20px'}}>
                <div className='header__left'>
                    <NavLink to="/">
                        <img style={{width:'90px', position: 'absolute', top:'-5px'}} src={'img/logo.png'} alt="Logo"/>
                    </NavLink>
                </div>
                <div className="header__center">
                    <NavLink to="/home" className="header__option" activeClassName="header__option--active">
                        Home
                    </NavLink>
                    <NavLink to="/organizations" className="header__option" activeClassName="header__option--active">
                        Organizations
                    </NavLink>
                    <NavLink to="/users" className="header__option" activeClassName="header__option--active">
                        Users
                    </NavLink>
                    <NavLink to="/roles" className="header__option" activeClassName="header__option--active">
                        Roles
                    </NavLink>
                    <NavLink to="/clients" className="header__option" activeClassName="header__option--active">
                        Clients
                    </NavLink>
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                <Switch>
                    <Route exact path="/organizations">
                        <Organizations/>
                    </Route>
                    <Route exact path="/users">
                        <Users/>
                    </Route>
                    <Route exact path="/roles">
                        <Roles/>
                    </Route>
                    <Route exact path="/clients">
                        <Clients/>
                    </Route>
                    <Route exact path={["/","/home"]}>
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
