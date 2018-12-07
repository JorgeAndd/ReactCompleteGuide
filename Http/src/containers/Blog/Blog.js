import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import "./Blog.css";

class Blog extends Component {
    state = {
        auth: false
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            <li><NavLink to="/newpost">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/newpost" component={NewPost} /> : null}
                    <Route path="/posts" component={Posts} />

                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;
