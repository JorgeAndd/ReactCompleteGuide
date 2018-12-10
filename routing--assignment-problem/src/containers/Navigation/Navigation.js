import React from 'react';
import { BrowserRouter, Route, NavLink, Redirect, Switch } from 'react-router-dom';

import Courses from '../Courses/Courses';
import Users from '../Users/Users';

import './Navigation.css';

const navigation = () => {
    return (
        <div className="Navigation">
            <BrowserRouter>
                <div>
                    <header>
                        <nav><ul>
                            <li><NavLink to="/users">Users</NavLink></li>
                            <li><NavLink to="/courses">Courses</NavLink></li>
                        </ul></nav>
                    </header>

                    <Switch>
                        <Route path='/users' component={Users} />
                        <Route path='/courses' component={Courses} />
                        <Redirect from='/all-courses' to='/courses/' exact />
                        <Route render={() => <h1>Page not Found</h1>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default navigation;