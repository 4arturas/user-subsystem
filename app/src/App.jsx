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
import Client from "./components/Client";
import Organization from "./components/Organization";
import User from "./components/User";
import Role from "./components/Role";
import {purple} from "@material-ui/core/colors";
import {ThemeProvider, createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0165B2'
        },
        secondary: purple
    },
    typography: {
        fontFamily: 'Arial',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
});

function App()
{

    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <div className="header" style={{height:'20px'}}>
                <div className='header__left'>
                    <div style={{position:"absolute", left:"100px", top:"12px", color:"#0165B2"}}>users subsystem</div>
                    <NavLink to="/">
                        <img style={{width:'90px', position: 'absolute', top:'-5px'}} src={'/img/logo.png'} alt="Logo"/>
                    </NavLink>
                </div>
                <div className="header__center">
                    <NavLink to="/home" className="header__option" activeClassName="header__option--active">
                        Home
                    </NavLink>
                    <NavLink to="/clients" className="header__option" activeClassName="header__option--active">
                        Clients
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
                </div>
            </div>
            <div style={{padding:'30px 20px'}}>
                <Switch>
                    <Route exact path="/clients">
                        <Clients/>
                    </Route>
                    <Route exact path="/organizations">
                        <Organizations clientId={null}/>
                    </Route>
                    <Route exact path="/users">
                        <Users organizationId={null}/>
                    </Route>
                    <Route exact path="/roles">
                        <Roles userId={null}/>
                    </Route>
                    <Route exact path={["/","/home"]}>
                        <Home/>
                    </Route>

                    <Route exact path="/clients/client">
                        <Client/>
                    </Route>
                    <Route exact path="/organizations/organization">
                        <Organization/>
                    </Route>
                    <Route exact path="/users/user">
                        <User/>
                    </Route>
                    <Route exact path="/roles/role">
                        <Role/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
