import React, { Component, Suspense } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Posts from './Posts/Posts';
import "./Blog.css";

const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        let newPost = null;
        if (this.state.auth) {
            newPost = (
                <Route
                    path="/newpost"
                    render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewPost />
                        </Suspense>
                    )}
                />
            );
        }

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
                    {newPost}
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" exact />

                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;
