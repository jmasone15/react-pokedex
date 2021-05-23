import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from "./components/Loading";

const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading,
});

const Pokemon = Loadable({
    loader: () => import('./pages/Pokemon'),
    loading: Loading,
});

const Test = Loadable({
    loader: () => import('./pages/Test'),
    loading: Loading
});

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/info">
                    <Pokemon />
                </Route>
                <Route path="/test">
                    <Test />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}