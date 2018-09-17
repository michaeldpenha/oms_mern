import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../components/home/HomeComponent';
const Router = () => (
    <Switch>
        <Route exact path='/' component={HomeComponent} />
    </Switch>
)

export default Router;