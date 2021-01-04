// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
import {Redirect, Route} from "react-router-dom";
import Auth from "../../../utils/auth";
import React from "react";

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                Auth.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;