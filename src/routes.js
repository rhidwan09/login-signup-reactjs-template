import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const Routes = () => (
    <BrowserRouter>
        <switch>
            <Route exact path='/' component={Welcome} />
            <Route  path='/login' component={Login} />
            <Route  path='/signup' component={SignUp} />
        </switch>
    </BrowserRouter>

);


export default Routes;
