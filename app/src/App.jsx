import React, {useState} from 'react'
import './App.css'
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
            <div className="App">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is: {count}
                </button>
            </div>
            <div style={{textAlign:'center', borderBottom:'1px solid black', paddingBottom:'100px;'}}>
                <NavLink to="/">
                    Home
                </NavLink>&nbsp;&nbsp;&nbsp;
                <NavLink to="/organizations">
                    Organizations
                </NavLink>
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
