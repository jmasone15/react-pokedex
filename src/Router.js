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

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/react-pokedex">
                    <Home />
                </Route>
                <Route>
                    <Pokemon path="/info" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}