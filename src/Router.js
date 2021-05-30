import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from "./components/Loading";

// Loading components for the lazy loading page.
const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading,
});
const Pokemon = Loadable({
    loader: () => import('./pages/Pokemon'),
    loading: Loading,
});
const PokedexPage = Loadable({
    loader: () => import("./pages/PokedexPage"),
    loading: Loading,
});

export default function Router() {
    return (
        <BrowserRouter basename="/react-pokedex">
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/info">
                    <Pokemon />
                </Route>
                <Route path="/pokedex">
                    <PokedexPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}