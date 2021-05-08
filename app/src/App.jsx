import React, {useState} from 'react'
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

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <div className="header">
                <div className='header__left'>
                    <NavLink to="/">
                        <img style={{width:'30px'}} src={'img/logo.png'} alt="Logo"/>
                    </NavLink>
                </div>
                <div className="header__center">
                    <NavLink to="/home" className="header__option" activeClassName="header__option--active">
                        Home
                    </NavLink>
                    <NavLink to="/organizations" className="header__option" activeClassName="header__option--active">
                        Organizations
                    </NavLink>
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                <Switch>
                    <Route exact path="/organizations">
                        <Organizations/>
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
