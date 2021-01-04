import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './utils/MuiTheme';
import SignInPage from "./views/Auth/signIn";
import SignUpPage from "./views/Auth/signUp";
import Home from "./views/Home/Home";
import Hoc from "./components/Router/Hoc/Hoc";
import { I18nProvider, I18n } from '@lingui/react';
import { i18n, defaultLocale } from './utils/i18n';
import routes from './constants/routes';
import './assets/material.css';

export default function App() {
  return (
      <Router>
        <I18nProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Switch>
              {routes.map(route => (
                  <Route exact={route.exact} path={route.path}>
                    {route.component}
                  </Route>
              ))}
              {/* <Route path="show-user/:id">

              </Route> */}
              {/*<Route path="/" exact>*/}
              {/*  <Home />*/}
              {/*</Route>*/}
              {/*<Route path="/signin">*/}
              {/*  <SignInPage />*/}
              {/*</Route>*/}
              {/*<Route path="/signup">*/}
              {/*  <SignUpPage />*/}
              {/*</Route>*/}
              <Hoc/>
            </Switch>
          </ThemeProvider>
        </I18nProvider>
      </Router>
  );
}